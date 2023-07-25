import type { Action } from 'redux';
import type { CorePayload, CoreSelectOption } from '@interfaces/core';

export const GET_USERS_KEY = 'GET_USERS';

export const GetUsersActionTypes = {
    REQUEST: `${GET_USERS_KEY}_REQUEST`,
    SUCCESS: `${GET_USERS_KEY}_SUCCESS`,
    FAILURE: `${GET_USERS_KEY}_FAILURE`,
} as const;

export interface GetUsersRequestPayload extends CorePayload {
    idx: string;
}

export type GetUsersSuccessPayload = CoreSelectOption[];

export interface GetUsersRequestAction extends Action<string> {
    payload: GetUsersRequestPayload;
}

export interface GetUsersSuccessAction extends Action<string> {
    payload: GetUsersSuccessPayload;
}

export function getUsersRequest(
    payload: GetUsersRequestPayload,
): GetUsersRequestAction {
    return {
        type: GetUsersActionTypes.REQUEST,
        payload,
    };
}

export function getUsersSuccess(
    payload: GetUsersSuccessPayload,
): GetUsersSuccessAction {
    return {
        type: GetUsersActionTypes.SUCCESS,
        payload,
    };
}
