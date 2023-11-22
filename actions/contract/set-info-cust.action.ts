import type { Action } from 'redux';
import type { KeyValue } from '@models/keyValue';

export const INFO_CUST_KEY = 'WR-INFO_CUST';

export const InfoCustActionTypes = {
    CREATE: `CREATE_${INFO_CUST_KEY}`,
    SELECT: `SELECT_${INFO_CUST_KEY}`,
    UPDATE: `UPDATE_${INFO_CUST_KEY}`,
    DELETE: `DELETE_${INFO_CUST_KEY}`,
} as const;

export interface CreateInfoCustPayload extends KeyValue {}

export interface UpdateInfoCustPayload extends Partial<CreateInfoCustPayload> {}

export interface DeleteInfoCustPayload {
    index: number;
}

export interface CreateInfoCustAction extends Action<string> {
    payload: CreateInfoCustPayload;
}

export interface SelectInfoCustAction extends Action<string> {
    payload: KeyValue | null;
}

export interface UpdateInfoCustAction extends Action<string> {
    payload: UpdateInfoCustPayload;
}

export interface DeleteInfoCustAction extends Action<string> {
    payload: DeleteInfoCustPayload;
}

export function createInfoCust(
    payload: CreateInfoCustPayload,
): CreateInfoCustAction {
    return {
        type: InfoCustActionTypes.CREATE,
        payload,
    };
}

export function selectInfoCust(payload: KeyValue | null): SelectInfoCustAction {
    return {
        type: InfoCustActionTypes.SELECT,
        payload,
    };
}

export function updateInfoCust(
    payload: UpdateInfoCustPayload,
): UpdateInfoCustAction {
    return {
        type: InfoCustActionTypes.UPDATE,
        payload,
    };
}

export function deleteInfoCust(
    payload: DeleteInfoCustPayload,
): DeleteInfoCustAction {
    return {
        type: InfoCustActionTypes.DELETE,
        payload,
    };
}
