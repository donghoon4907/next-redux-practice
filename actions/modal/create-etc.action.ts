import type { Action } from 'redux';

export const CREATE_ETC_MODAL_KEY = 'CREATE-ETC-MODAL';

export const CreateEtcModalActionTypes = {
    SHOW: `SHOW_${CREATE_ETC_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_ETC_MODAL_KEY}`,
} as const;

export interface CreateEtcModalShowAction extends Action<string> {}

export interface CreateEtcModalHideAction extends Action<string> {}

export function showCreateEtcModal(): CreateEtcModalShowAction {
    return {
        type: CreateEtcModalActionTypes.SHOW,
    };
}

export function hideCreateEtcModal(): CreateEtcModalHideAction {
    return {
        type: CreateEtcModalActionTypes.HIDE,
    };
}
