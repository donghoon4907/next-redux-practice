import type { GetServerSidePropsCallback } from 'next-redux-wrapper';
import type { GetServerSidePropsContext, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { SagaStore } from '@store/redux';

export function permissionMiddleware(
    callback?: (
        store: SagaStore,
        ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
        loggedInUser: any,
    ) => Promise<any>,
): GetServerSidePropsCallback<SagaStore, any> {
    return (store) => async (ctx) => {
        const { getState } = store;

        let output: any = {
            props: {},
        };

        const { hr } = getState();
        /**
         * 사용자 정보가 없는 경우 로그인 페이지로 이동
         */
        if (hr.loggedInUser) {
            const nextProp = await callback?.(store, ctx, hr.loggedInUser);

            if (nextProp) {
                output = {
                    ...output,
                    ...nextProp,
                };
            }
        } else {
            output['redirect'] = {
                destination: '/login',
                permanent: false,
            };
        }

        return output;
    };
}
