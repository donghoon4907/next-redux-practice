import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Excontract } from '@models/excontract';

export const EXCONTRACT_KEY = 'WR-EXCONTRACT';

export const ExcontractActionTypes = {
    CREATE: `CREATE_${EXCONTRACT_KEY}`,
    UPDATE: `UPDATE_${EXCONTRACT_KEY}`,
    DELETE: `DELETE_${EXCONTRACT_KEY}`,
} as const;

export interface CreateExcontractPayload extends CorePayload, Excontract {}

export interface UpdateExcontractPayload
    extends Partial<CreateExcontractPayload> {}

export interface DeleteExcontractPayload extends CorePayload {
    index: number;
}

export interface CreateExcontractAction extends Action<string> {
    payload: CreateExcontractPayload;
}

export interface UpdateExcontractAction extends Action<string> {
    payload: UpdateExcontractPayload;
}

export interface DeleteExcontractAction extends Action<string> {
    payload: DeleteExcontractPayload;
}

export function createExcontract(
    payload: CreateExcontractPayload,
): CreateExcontractAction {
    return {
        type: ExcontractActionTypes.CREATE,
        payload,
    };
}

export function updateExcontract(
    payload: UpdateExcontractPayload,
): UpdateExcontractAction {
    return {
        type: ExcontractActionTypes.UPDATE,
        payload,
    };
}

export function deleteExcontract(
    payload: DeleteExcontractPayload,
): DeleteExcontractAction {
    return {
        type: ExcontractActionTypes.DELETE,
        payload,
    };
}
