import { Action } from 'redux';

export const DRAWER_KEY = 'WR_DRAWER';

export const DrawerActionTypes = {
    SHOW: `SHOW_${DRAWER_KEY}`,
    HIDE: `HIDE_${DRAWER_KEY}`,
} as const;

export interface DrawerShowAction extends Action<string> {}

export interface DrawerHideAction extends Action<string> {}

export function showDrawer(): DrawerShowAction {
    return {
        type: DrawerActionTypes.SHOW,
    };
}

export function hideDrawer(): DrawerHideAction {
    return {
        type: DrawerActionTypes.HIDE,
    };
}
