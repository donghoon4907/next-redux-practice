import type { Action } from 'redux';

export const CREATE_EXCONTRACT_MODAL_KEY = 'CREATE-EXCONTRACT-MODAL';

export const CreateExcontractModalActionTypes = {
    SHOW: `SHOW_${CREATE_EXCONTRACT_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_EXCONTRACT_MODAL_KEY}`,
} as const;

export type CreateExcontractModalPayload = 'long' | 'car' | 'gen';

export interface CreateExcontractModalShowAction extends Action<string> {
    payload: CreateExcontractModalPayload;
}

export interface CreateExcontractModalHideAction extends Action<string> {
    payload: CreateExcontractModalPayload;
}

export function showCreateExcontractModal(
    payload: CreateExcontractModalPayload,
): CreateExcontractModalShowAction {
    return {
        type: CreateExcontractModalActionTypes.SHOW,
        payload,
    };
}

export function hideCreateExcontractModal(
    payload: CreateExcontractModalPayload,
): CreateExcontractModalHideAction {
    return {
        type: CreateExcontractModalActionTypes.HIDE,
        payload,
    };
}
