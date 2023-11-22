import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const PERMISSION_KEY = 'WR-PERMISSION';

export const PermissionActionTypes = {
    UPDATE: `UPDATE_${PERMISSION_KEY}`,
} as const;

export interface PermissionUpdatePayload extends CorePayload {
    userid: string;
    user_info?: any;
    connection_info?: any;
    permission?: any;
}

export interface PermissionUpdateAction extends Action<string> {
    payload: PermissionUpdatePayload;
}

export function updatePermission(
    payload: PermissionUpdatePayload,
): PermissionUpdateAction {
    return {
        type: PermissionActionTypes.UPDATE,
        payload,
    };
}
