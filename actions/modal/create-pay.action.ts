import type { Action } from 'redux';

export const CREATE_PAY_MODAL_KEY = 'CREATE-PAY-MODAL';

export const CreatePayModalActionTypes = {
    SHOW: `SHOW_${CREATE_PAY_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_PAY_MODAL_KEY}`,
} as const;

export interface CreatePayModalShowAction extends Action<string> {}

export interface CreatePayModalHideAction extends Action<string> {}

export function showCreatePayModal(): CreatePayModalShowAction {
    return {
        type: CreatePayModalActionTypes.SHOW,
    };
}

export function hideCreatePayModal(): CreatePayModalHideAction {
    return {
        type: CreatePayModalActionTypes.HIDE,
    };
}
