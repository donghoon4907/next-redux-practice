import type { Action } from 'redux';
import type { CorePayload, CoreSelectOption } from '@interfaces/core';

export const GET_LAZY_USERS_KEY = 'GET_LAZY_USERS';

export const GetLazyUsersActionTypes = {
    REQUEST: `${GET_LAZY_USERS_KEY}_REQUEST`,
    SUCCESS: `${GET_LAZY_USERS_KEY}_SUCCESS`,
    FAILURE: `${GET_LAZY_USERS_KEY}_FAILURE`,
} as const;

export interface GetLazyUsersRequestPayload extends CorePayload {
    idx: string;
}

export type GetLazyUsersSuccessPayload = CoreSelectOption[];

export interface GetLazyUsersRequestAction extends Action<string> {
    payload: GetLazyUsersRequestPayload;
}

export interface GetLazyUsersSuccessAction extends Action<string> {
    payload: GetLazyUsersSuccessPayload;
}

export function getLazyUsersRequest(
    payload: GetLazyUsersRequestPayload,
): GetLazyUsersRequestAction {
    return {
        type: GetLazyUsersActionTypes.REQUEST,
        payload,
    };
}

export function getLazyUsersSuccess(
    payload: GetLazyUsersSuccessPayload,
): GetLazyUsersSuccessAction {
    return {
        type: GetLazyUsersActionTypes.SUCCESS,
        payload,
    };
}
