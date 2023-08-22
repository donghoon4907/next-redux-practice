import type { Action } from 'redux';

export const CREATE_ENDORSEMENT_MODAL_KEY = 'CREATE-ENDORSEMENT-MODAL';

export const CreateEndorsementModalActionTypes = {
    SHOW: `SHOW_${CREATE_ENDORSEMENT_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_ENDORSEMENT_MODAL_KEY}`,
} as const;

export interface CreateEndorsementModalShowAction extends Action<string> {}

export interface CreateEndorsementModalHideAction extends Action<string> {}

export function showCreateEndorsementModal(): CreateEndorsementModalShowAction {
    return {
        type: CreateEndorsementModalActionTypes.SHOW,
    };
}

export function hideCreateEndorsementModal(): CreateEndorsementModalHideAction {
    return {
        type: CreateEndorsementModalActionTypes.HIDE,
    };
}
