import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { AppState } from '../reducers';
import { LoadingState } from '../reducers/common/loading';
import { useAuthenticate } from './use-authenticate';

interface OptionProps {
    useAuth?: boolean;
    useReload?: boolean;
}

export const useMutation = (
    actionCreator: (payload: any) => AnyAction,
    options: OptionProps = {},
) => {
    const router = useRouter();

    const dispatch = useDispatch();

    const { validateToken } = useAuthenticate();

    const { loading } = useSelector<AppState, LoadingState>(
        (state) => state.loading,
    );

    const fireEvent = (args = {}, callback?: (params: any) => void) => {
        const { useAuth, useReload } = options;

        if (useAuth) {
            const token = validateToken();

            if (token === null) {
                return null;
            }
        }

        if (loading) {
            return alert('요청 중입니다. 잠시만 기다려주세요.');
        }

        dispatch(
            actionCreator({
                ...args,
                callbackFunc: (params: any) => {
                    if (useReload) {
                        router.replace(router.asPath);
                    } else {
                        if (callback) {
                            callback(params);
                        }
                    }
                },
            }),
        );
    };

    return [fireEvent];
};
