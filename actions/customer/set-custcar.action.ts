import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Custcar } from '@models/custcar';

export const CUSTCAR_KEY = 'WR-CUSTCAR';

export const CustcarActionTypes = {
    CREATE: `CREATE_${CUSTCAR_KEY}`,
    UPDATE: `UPDATE_${CUSTCAR_KEY}`,
    DELETE: `DELETE_${CUSTCAR_KEY}`,
} as const;

export interface CreateCustcarPayload extends CorePayload, Custcar {}

export interface UpdateCustcarPayload extends Partial<CreateCustcarPayload> {}

export interface DeleteCustcarPayload extends CorePayload {
    index: number;
}

export interface CreateCustcarAction extends Action<string> {
    payload: CreateCustcarPayload;
}

export interface UpdateCustcarAction extends Action<string> {
    payload: UpdateCustcarPayload;
}

export interface DeleteCustcarAction extends Action<string> {
    payload: DeleteCustcarPayload;
}

export function createCustcar(
    payload: CreateCustcarPayload,
): CreateCustcarAction {
    return {
        type: CustcarActionTypes.CREATE,
        payload,
    };
}

export function updateCustcar(
    payload: UpdateCustcarPayload,
): UpdateCustcarAction {
    return {
        type: CustcarActionTypes.UPDATE,
        payload,
    };
}

export function deleteCustcar(
    payload: DeleteCustcarPayload,
): DeleteCustcarAction {
    return {
        type: CustcarActionTypes.DELETE,
        payload,
    };
}
