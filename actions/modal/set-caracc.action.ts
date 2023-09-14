import type { Action } from 'redux';

export const SET_CARACC_MODAL_KEY = 'SET_CARACC-MODAL';

export const SetCaraccModalActionTypes = {
    SHOW: `SHOW_${SET_CARACC_MODAL_KEY}`,
    HIDE: `HIDE_${SET_CARACC_MODAL_KEY}`,
} as const;

export interface SetCaraccModalShowAction extends Action<string> {}

export interface SetCaraccModalHideAction extends Action<string> {}

export function showSetCaraccModal(): SetCaraccModalShowAction {
    return {
        type: SetCaraccModalActionTypes.SHOW,
    };
}

export function hideSetCaraccModal(): SetCaraccModalHideAction {
    return {
        type: SetCaraccModalActionTypes.HIDE,
    };
}
