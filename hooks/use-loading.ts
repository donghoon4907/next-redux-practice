import { loadingOff, loadingOn } from '@actions/loading/loading.action';
import { useDispatch } from 'react-redux';

export const useLoading = () => {
    const dispatch = useDispatch();

    const on = () => {
        dispatch(loadingOn());
    };

    const off = () => {
        dispatch(loadingOff());
    };

    return { on, off };
};
