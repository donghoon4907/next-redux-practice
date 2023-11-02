import type { Action } from 'redux';
import type { KeyValue } from '@models/keyValue';

export const INFO_PRODUCT_KEY = 'WR-INFO_PRODUCT';

export const InfoProductActionTypes = {
    CREATE: `CREATE_${INFO_PRODUCT_KEY}`,
    UPDATE: `UPDATE_${INFO_PRODUCT_KEY}`,
    DELETE: `DELETE_${INFO_PRODUCT_KEY}`,
} as const;

export interface CreateInfoProductPayload extends KeyValue {}

export interface UpdateInfoProductPayload
    extends Partial<CreateInfoProductPayload> {}

export interface DeleteInfoProductPayload {
    index: number;
}

export interface CreateInfoProductAction extends Action<string> {
    payload: CreateInfoProductPayload;
}

export interface UpdateInfoProductAction extends Action<string> {
    payload: UpdateInfoProductPayload;
}

export interface DeleteInfoProductAction extends Action<string> {
    payload: DeleteInfoProductPayload;
}

export function createInfoProduct(
    payload: CreateInfoProductPayload,
): CreateInfoProductAction {
    return {
        type: InfoProductActionTypes.CREATE,
        payload,
    };
}

export function updateInfoProduct(
    payload: UpdateInfoProductPayload,
): UpdateInfoProductAction {
    return {
        type: InfoProductActionTypes.UPDATE,
        payload,
    };
}

export function deleteInfoProduct(
    payload: DeleteInfoProductPayload,
): DeleteInfoProductAction {
    return {
        type: InfoProductActionTypes.DELETE,
        payload,
    };
}
