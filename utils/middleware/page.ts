import type { GetServerSidePropsCallback } from 'next-redux-wrapper';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { SagaStore } from '@store/redux';
import { getCookie } from 'cookies-next';
import { END } from 'redux-saga';
import usersService from '@services/usersService';
import { updatePermission } from '@actions/user/set-permission.action';
import { initializeAxios } from '@utils/axios/backend';
import { hideDrawer } from '@actions/drawer/drawer.action';

// 페이지 공통 미들웨어
export function pageMiddleware(
    callback: (
        store: SagaStore,
        ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
        loggedInUser: any,
    ) => Promise<any>,
): GetServerSidePropsCallback<SagaStore, any> {
    return (store) => async (ctx) => {
        // 페이지 컴포넌트에 주입될 props
        let output: any = {
            props: {},
        };

        const { req, res } = ctx;
        // 서버에서만 실행
        if (req && res) {
            const navKey = process.env.COOKIE_NAV_COLLAPSE_KEY || '';
            const tokenKey = process.env.COOKIE_TOKEN_KEY || '';
            // 네비게이션 바 열림 상태 로드
            const isOpen = getCookie(navKey, {
                req,
                res,
            });
            // 닫힌 상태인 경우
            if (isOpen === 'N') {
                store.dispatch(hideDrawer());
            }
            // 로그인 시 발급되는 토큰 로드
            const token = getCookie(tokenKey, {
                req,
                res,
            });
            // 토큰 값으로 Axios를 초기화
            initializeAxios(token);

            try {
                // 권한 조회 API 요청
                const { data } = await usersService.getPermission({
                    division: 'system',
                });
                const { user_info } = data;
                // 특정 권한 정보가 있는 경우
                if (user_info) {
                    // 전역 상태에 권한 정보 업데이트
                    store.dispatch(updatePermission(data));
                    // 다음 스크립트를 실행
                    const nextProp = await callback?.(store, ctx, data);
                    // props를 조합
                    if (nextProp) {
                        output = {
                            ...output,
                            ...nextProp,
                        };
                    }
                }
                // 요청 종료 설정
                store.dispatch(END);
                // 요청이 끝날 때 까지 대기
                await store.sagaTask?.toPromise();
            } catch {
                // API 요청 실패 시 로그인 페이지로 리다이렉트
                output['redirect'] = {
                    destination: '/login',
                    permanent: false,
                };
            }
        }

        return output;
    };
}
