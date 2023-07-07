import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Fc } from '@models/fc';

export const GET_FCS_KEY = 'GET_FCS';

export const GetFcsActionTypes = {
    REQUEST: `${GET_FCS_KEY}_REQUEST`,
    SUCCESS: `${GET_FCS_KEY}_SUCCESS`,
    FAILURE: `${GET_FCS_KEY}_FAILURE`,
} as const;

export interface GetFcsRequestPayload extends CorePayload {
    idx: string;
}

export type GetFcsSuccessPayload = Fc[];

export interface GetFcsRequestAction extends Action<string> {
    payload: GetFcsRequestPayload;
}

export interface GetFcsSuccessAction extends Action<string> {
    payload: GetFcsSuccessPayload;
}

export function getFcsRequest(
    payload: GetFcsRequestPayload,
): GetFcsRequestAction {
    return {
        type: GetFcsActionTypes.REQUEST,
        payload,
    };
}

export function getFcsSuccess(
    payload: GetFcsSuccessPayload,
): GetFcsSuccessAction {
    return {
        type: GetFcsActionTypes.SUCCESS,
        payload,
    };
}
