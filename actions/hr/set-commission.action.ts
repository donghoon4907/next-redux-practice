import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import { Commission } from '@models/commission';

export const COMMISSION_KEY = 'WR-COMMISSION';

export const CommissionActionTypes = {
    CREATE: `CREATE_${COMMISSION_KEY}`,
    UPDATE: `UPDATE_${COMMISSION_KEY}`,
    DELETE: `DELETE_${COMMISSION_KEY}`,
} as const;

export interface CreateCommissionPayload extends CorePayload, Commission {}

export interface UpdateCommissionPayload
    extends Partial<CreateCommissionPayload> {}

export interface DeleteCommissionPayload extends CorePayload {
    index: number;
}

export interface CreateCommissionAction extends Action<string> {
    payload: CreateCommissionPayload;
}

export interface UpdateCommissionAction extends Action<string> {
    payload: UpdateCommissionPayload;
}

export interface DeleteCommissionAction extends Action<string> {
    payload: DeleteCommissionPayload;
}

export function createCommission(
    payload: CreateCommissionPayload,
): CreateCommissionAction {
    return {
        type: CommissionActionTypes.CREATE,
        payload,
    };
}

export function updateCommission(
    payload: UpdateCommissionPayload,
): UpdateCommissionAction {
    return {
        type: CommissionActionTypes.UPDATE,
        payload,
    };
}

export function deleteCommission(
    payload: DeleteCommissionPayload,
): DeleteCommissionAction {
    return {
        type: CommissionActionTypes.DELETE,
        payload,
    };
}
