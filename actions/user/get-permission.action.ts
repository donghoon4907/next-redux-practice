import { CorePayload } from '@interfaces/core';
import { Action } from 'redux';

export const GET_PERMISSION_KEY = 'GET_PERMISSION';

export const GetPermissionActionTypes = {
    REQUEST: `${GET_PERMISSION_KEY}_REQUEST`,
    SUCCESS: `${GET_PERMISSION_KEY}_SUCCESS`,
    FAILURE: `${GET_PERMISSION_KEY}_FAILURE`,
} as const;

export interface GetPermissionRequestPayload extends CorePayload {
    division: string;
}

export interface GetPermissionSuccessPayload {
    access_token: string;
}

export interface GetPermissionRequestAction extends Action<string> {
    payload: GetPermissionRequestPayload;
}

export interface GetPermissionSuccessAction extends Action<string> {
    payload: GetPermissionSuccessPayload;
}

export function getPermissionRequest(
    payload: GetPermissionRequestPayload,
): GetPermissionRequestAction {
    return {
        type: GetPermissionActionTypes.REQUEST,
        payload,
    };
}

export function getPermissionSuccess(
    payload: GetPermissionSuccessPayload,
): GetPermissionSuccessAction {
    return {
        type: GetPermissionActionTypes.SUCCESS,
        payload,
    };
}
