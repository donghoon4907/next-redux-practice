import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';

import { AppState } from '../reducers';
import { LoadingState } from '../reducers/common/loading';

export const useLazyQuery = (actionCreator: (payload: any) => AnyAction) => {
    const dispatch = useDispatch();

    const { loading } = useSelector<AppState, LoadingState>(
        (state) => state.loading,
    );

    const fireEvent = (args = {}) => {
        if (!loading) {
            dispatch(actionCreator(args));
        }
    };

    return [fireEvent];
};
