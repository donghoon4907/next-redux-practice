import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_USER_KEY = 'GET_USER';

export const GetUserActionTypes = {
    REQUEST: `${GET_USER_KEY}_REQUEST`,
    SUCCESS: `${GET_USER_KEY}_SUCCESS`,
    FAILURE: `${GET_USER_KEY}_FAILURE`,
} as const;

export interface GetUserRequestPayload extends CorePayload {
    idx: string;
}

export type GetUserSuccessPayload = any;

export interface GetUserRequestAction extends Action<string> {
    payload: GetUserRequestPayload;
}

export interface GetUserSuccessAction extends Action<string> {
    payload: GetUserSuccessPayload;
}

export function getUserRequest(
    payload: GetUserRequestPayload,
): GetUserRequestAction {
    return {
        type: GetUserActionTypes.REQUEST,
        payload,
    };
}

export function getUserSuccess(
    payload: GetUserSuccessPayload,
): GetUserSuccessAction {
    return {
        type: GetUserActionTypes.SUCCESS,
        payload,
    };
}
