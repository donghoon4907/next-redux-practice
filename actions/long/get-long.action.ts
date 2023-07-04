import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Response } from '@models/response';

export const GET_LONG_KEY = 'GET_LONG';

export const GetLongActionTypes = {
    REQUEST: `${GET_LONG_KEY}_REQUEST`,
    SUCCESS: `${GET_LONG_KEY}_SUCCESS`,
    FAILURE: `${GET_LONG_KEY}_FAILURE`,
} as const;

export interface GetLongRequestPayload extends CorePayload {
    condition?: {
        paydate?: Array<string>;
    };
    page: number;
    nums: number;
}

export interface GetLongSuccessPayload extends Response {
    lastPayload: GetLongRequestPayload;
}

export interface GetLongRequestAction extends Action<string> {
    payload: GetLongRequestPayload;
}

export interface GetLongSuccessAction extends Action<string> {
    payload: GetLongSuccessPayload;
}

export function getLongRequest(
    payload: GetLongRequestPayload,
): GetLongRequestAction {
    return {
        type: GetLongActionTypes.REQUEST,
        payload,
    };
}

export function getLongSuccess(
    payload: GetLongSuccessPayload,
): GetLongSuccessAction {
    return {
        type: GetLongActionTypes.SUCCESS,
        payload,
    };
}
