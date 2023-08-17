import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { UserCustomer } from '@models/customer';

export const GET_USER_CUSTOMERS_KEY = 'GET_USER-CUSTOMERS';

export const GetUserCustomersActionTypes = {
    REQUEST: `${GET_USER_CUSTOMERS_KEY}_REQUEST`,
    SUCCESS: `${GET_USER_CUSTOMERS_KEY}_SUCCESS`,
    FAILURE: `${GET_USER_CUSTOMERS_KEY}_FAILURE`,
} as const;

export interface GetUserCustomersRequestPayload extends CorePayload {
    username: string;
    userid: string;
}

export type GetUserCustomersSuccessPayload = Array<UserCustomer>;

export interface GetUserCustomersRequestAction extends Action<string> {
    payload: GetUserCustomersRequestPayload;
}

export interface GetUserCustomersSuccessAction extends Action<string> {
    payload: GetUserCustomersSuccessPayload;
}

export function getUserCustomersRequest(
    payload: GetUserCustomersRequestPayload,
): GetUserCustomersRequestAction {
    return {
        type: GetUserCustomersActionTypes.REQUEST,
        payload,
    };
}

export function getUserCustomersSuccess(
    payload: GetUserCustomersSuccessPayload,
): GetUserCustomersSuccessAction {
    return {
        type: GetUserCustomersActionTypes.SUCCESS,
        payload,
    };
}
