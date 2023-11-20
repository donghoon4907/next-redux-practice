import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { AppState } from '@reducers/index';
import { LoadingState } from '@reducers/common/loading';

interface OptionProps {
    beforeAuth?: boolean;
    afterReload?: boolean;
}

export const useApi = (
    actionCreator: (payload: any) => AnyAction,
    options: OptionProps = {},
) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const { loading } = useSelector<AppState, LoadingState>(
        (state) => state.loading,
    );

    const fireEvent = (args = {}, callback?: (params: any) => void) => {
        const { beforeAuth, afterReload } = options;

        if (loading) {
            return alert('요청 중입니다. 잠시만 기다려주세요.');
        }

        dispatch(
            actionCreator({
                ...args,
                callback: (params: any) => {
                    if (afterReload) {
                        router.replace(router.asPath);
                    } else {
                        callback?.(params);
                    }
                },
            }),
        );
    };

    return fireEvent;
};
