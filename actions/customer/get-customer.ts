import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_CUSTOMER_KEY = 'GET_CUSTOMER';

export const GetCustomerActionTypes = {
    REQUEST: `${GET_CUSTOMER_KEY}_REQUEST`,
    SUCCESS: `${GET_CUSTOMER_KEY}_SUCCESS`,
    FAILURE: `${GET_CUSTOMER_KEY}_FAILURE`,
} as const;

export interface GetCustomerRequestPayload extends CorePayload {
    idx: string;
}

export type GetCustomerSuccessPayload = any;

export interface GetCustomerRequestAction extends Action<string> {
    payload: GetCustomerRequestPayload;
}

export interface GetCustomerSuccessAction extends Action<string> {
    payload: GetCustomerSuccessPayload;
}

export function getCustomerRequest(
    payload: GetCustomerRequestPayload,
): GetCustomerRequestAction {
    return {
        type: GetCustomerActionTypes.REQUEST,
        payload,
    };
}

export function getCustomerSuccess(
    payload: GetCustomerSuccessPayload,
): GetCustomerSuccessAction {
    return {
        type: GetCustomerActionTypes.SUCCESS,
        payload,
    };
}
