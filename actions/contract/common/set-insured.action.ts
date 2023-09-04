import type { Action } from 'redux';
import type { Insured } from '@models/insured';

export const INSURED_KEY = 'WR-INSURED';

export const InsuredActionTypes = {
    CREATE: `CREATE_${INSURED_KEY}`,
    UPDATE: `UPDATE_${INSURED_KEY}`,
    DELETE: `DELETE_${INSURED_KEY}`,
} as const;

export interface CreateInsuredPayload extends Insured {}

export interface UpdateInsuredPayload extends Partial<CreateInsuredPayload> {}

export interface DeleteInsuredPayload {
    index: number;
}

export interface CreateInsuredAction extends Action<string> {
    payload: CreateInsuredPayload;
}

export interface UpdateInsuredAction extends Action<string> {
    payload: UpdateInsuredPayload;
}

export interface DeleteInsuredAction extends Action<string> {
    payload: DeleteInsuredPayload;
}

export function createInsured(
    payload: CreateInsuredPayload,
): CreateInsuredAction {
    return {
        type: InsuredActionTypes.CREATE,
        payload,
    };
}

export function updateInsured(
    payload: UpdateInsuredPayload,
): UpdateInsuredAction {
    return {
        type: InsuredActionTypes.UPDATE,
        payload,
    };
}

export function deleteInsured(
    payload: DeleteInsuredPayload,
): DeleteInsuredAction {
    return {
        type: InsuredActionTypes.DELETE,
        payload,
    };
}
