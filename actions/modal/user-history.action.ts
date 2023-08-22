import type { Action } from 'redux';

export const USER_HISTORY_MODAL_KEY = 'USER_HISTORY_MODAL';

export const UserHistoryModalActionTypes = {
    SHOW: `SHOW_${USER_HISTORY_MODAL_KEY}`,
    HIDE: `HIDE_${USER_HISTORY_MODAL_KEY}`,
} as const;

export interface UserHistoryModalShowAction extends Action<string> {}

export interface UserHistoryModalHideAction extends Action<string> {}

export function showUserHistoryModal(): UserHistoryModalShowAction {
    return {
        type: UserHistoryModalActionTypes.SHOW,
    };
}

export function hideUserHistoryModal(): UserHistoryModalHideAction {
    return {
        type: UserHistoryModalActionTypes.HIDE,
    };
}
