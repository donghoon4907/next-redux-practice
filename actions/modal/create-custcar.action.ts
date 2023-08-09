import type { Action } from 'redux';

export const CREATE_CUSTCAR_MODAL_KEY = 'CREATE_CUSTCAR_MODAL_KEY';

export const CreateCustcarModalActionTypes = {
    SHOW: `SHOW_${CREATE_CUSTCAR_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_CUSTCAR_MODAL_KEY}`,
} as const;

export type CreateCustcarModalPayload = 'cust' | 'car';

export interface CreateCustcarModalShowAction extends Action<string> {
    payload: CreateCustcarModalPayload;
}

export interface CreateCustcarModalHideAction extends Action<string> {
    payload: CreateCustcarModalPayload;
}

export function showCreateCustcarModal(
    payload: CreateCustcarModalPayload,
): CreateCustcarModalShowAction {
    return {
        type: CreateCustcarModalActionTypes.SHOW,
        payload,
    };
}

export function hideCreateCustcarModal(
    payload: CreateCustcarModalPayload,
): CreateCustcarModalHideAction {
    return {
        type: CreateCustcarModalActionTypes.HIDE,
        payload,
    };
}
