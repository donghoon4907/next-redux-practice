import type { GetServerSidePropsCallback } from 'next-redux-wrapper';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { SagaStore } from '@store/redux';
import { getCookie } from 'cookies-next';
import { initialzeBackendAxios } from '@utils/axios/backend';
import hrsService from '@services/hrsService';
import { updatePermission } from '@actions/hr/set-permission.action';

export function permissionMiddleware(
    callback?: (
        store: SagaStore,
        ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
        loggedInUser: any,
    ) => Promise<any>,
): GetServerSidePropsCallback<SagaStore, any> {
    return (store) => async (ctx) => {
        let output: any = {
            props: {},
        };

        const { req, res } = ctx;
        // 서버에서만 실행
        if (req && res) {
            const token = getCookie(process.env.COOKIE_TOKEN_KEY || '', {
                req,
                res,
            });
            // axios 초기화
            initialzeBackendAxios(token);

            try {
                const { data } = await hrsService.getPermission({
                    division: 'system',
                });
                const { user_info } = data;
                // 특정 권한 정보가 있는 경우
                if (user_info) {
                    store.dispatch(updatePermission(data));

                    const nextProp = await callback?.(store, ctx, data);

                    if (nextProp) {
                        output = {
                            ...output,
                            ...nextProp,
                        };
                    }
                }
            } catch {
                output['redirect'] = {
                    destination: '/login',
                    permanent: false,
                };
            }
        }

        return output;
    };
}
