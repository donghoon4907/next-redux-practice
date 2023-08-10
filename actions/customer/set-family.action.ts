import type { Action } from 'redux';
import type { Family } from '@models/family';

export const FAMILY_KEY = 'WR-FAMILY';

export const FamilyActionTypes = {
    CREATE: `CREATE_${FAMILY_KEY}`,
    UPDATE: `UPDATE_${FAMILY_KEY}`,
    DELETE: `DELETE_${FAMILY_KEY}`,
} as const;

export interface CreateFamilyPayload extends Family {}

export interface UpdateFamilyPayload extends Partial<CreateFamilyPayload> {}

export interface DeleteFamilyPayload {
    index: number;
}

export interface CreateFamilyAction extends Action<string> {
    payload: CreateFamilyPayload;
}

export interface UpdateFamilyAction extends Action<string> {
    payload: UpdateFamilyPayload;
}

export interface DeleteFamilyAction extends Action<string> {
    payload: DeleteFamilyPayload;
}

export function createFamily(payload: CreateFamilyPayload): CreateFamilyAction {
    return {
        type: FamilyActionTypes.CREATE,
        payload,
    };
}

export function updateFamily(payload: UpdateFamilyPayload): UpdateFamilyAction {
    return {
        type: FamilyActionTypes.UPDATE,
        payload,
    };
}

export function deleteFamily(payload: DeleteFamilyPayload): DeleteFamilyAction {
    return {
        type: FamilyActionTypes.DELETE,
        payload,
    };
}
