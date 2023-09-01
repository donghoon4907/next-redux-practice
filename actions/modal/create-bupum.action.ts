import type { Action } from 'redux';

export const CREATE_BUPUM_MODAL_KEY = 'CREATE-BUPUM-MODAL';

export const CreateBupumModalActionTypes = {
    SHOW: `SHOW_${CREATE_BUPUM_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_BUPUM_MODAL_KEY}`,
} as const;

export interface CreateBupumModalShowAction extends Action<string> {}

export interface CreateBupumModalHideAction extends Action<string> {}

export function showCreateBupumModal(): CreateBupumModalShowAction {
    return {
        type: CreateBupumModalActionTypes.SHOW,
    };
}

export function hideCreateBupumModal(): CreateBupumModalHideAction {
    return {
        type: CreateBupumModalActionTypes.HIDE,
    };
}
