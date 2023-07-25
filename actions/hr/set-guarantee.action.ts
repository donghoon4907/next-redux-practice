import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import { Guarantee } from '@models/guarantee';

export const GUARANTEE_KEY = 'WR-GUARANTEE';

export const GuaranteeActionTypes = {
    CREATE: `CREATE_${GUARANTEE_KEY}`,
    UPDATE: `UPDATE_${GUARANTEE_KEY}`,
    DELETE: `DELETE_${GUARANTEE_KEY}`,
} as const;

export interface CreateGuaranteePayload
    extends CorePayload,
        Partial<Guarantee> {}

export interface UpdateGuaranteePayload extends CreateGuaranteePayload {
    index: number;
}

export interface DeleteGuaranteePayload extends CorePayload {
    index: number;
}

export interface CreateGuaranteeAction extends Action<string> {
    payload: CreateGuaranteePayload;
}

export interface UpdateGuaranteeAction extends Action<string> {
    payload: UpdateGuaranteePayload;
}

export interface DeleteGuaranteeAction extends Action<string> {
    payload: CreateGuaranteePayload;
}

export function createGuarantee(
    payload: CreateGuaranteePayload,
): CreateGuaranteeAction {
    return {
        type: GuaranteeActionTypes.CREATE,
        payload,
    };
}

export function updateGuarantee(
    payload: UpdateGuaranteePayload,
): UpdateGuaranteeAction {
    return {
        type: GuaranteeActionTypes.UPDATE,
        payload,
    };
}

export function deleteGuarantee(
    payload: DeleteGuaranteePayload,
): DeleteGuaranteeAction {
    return {
        type: GuaranteeActionTypes.DELETE,
        payload,
    };
}
