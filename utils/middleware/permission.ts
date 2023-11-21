import type { GetServerSidePropsCallback } from 'next-redux-wrapper';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { SagaStore } from '@store/redux';
import { getCookie } from 'cookies-next';
import { initialzeBackendAxios } from '@utils/axios/backend';
import usersService from '@services/usersService';
import { updatePermission } from '@actions/hr/user/set-permission.action';
// 권한 조회 미들웨어
export function permissionMiddleware(
    callback?: (
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
            // 로그인 시 발급되는 토큰 로드
            const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
                req,
                res,
            });
            // 토큰 값으로 Axios를 초기화
            initialzeBackendAxios(token);

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
