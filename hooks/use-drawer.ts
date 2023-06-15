import type { DrawerState } from '@reducers/drawer';
import type { AppState } from '@reducers/index';
import { useDispatch, useSelector } from 'react-redux';
import { hideDrawer, showDrawer } from '@actions/drawer/drawer.action';

export const useDrawer = () => {
    const dispatch = useDispatch();

    const { isOpen } = useSelector<AppState, DrawerState>(
        (state) => state.drawer,
    );

    const onToggle = () => {
        if (isOpen) {
            dispatch(hideDrawer());
        } else {
            dispatch(showDrawer());
        }
    };

    return { isOpen, onToggle };
};
