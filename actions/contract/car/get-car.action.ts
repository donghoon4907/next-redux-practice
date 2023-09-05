import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_CAR_KEY = 'GET_CAR';

export const GetCarActionTypes = {
    REQUEST: `${GET_CAR_KEY}_REQUEST`,
    SUCCESS: `${GET_CAR_KEY}_SUCCESS`,
    FAILURE: `${GET_CAR_KEY}_FAILURE`,
} as const;

export interface GetCarRequestPayload extends CorePayload {
    idx: string;
}

export type GetCarSuccessPayload = Record<string, any>;

export interface GetCarRequestAction extends Action<string> {
    payload: GetCarRequestPayload;
}

export interface GetCarSuccessAction extends Action<string> {
    payload: GetCarSuccessPayload;
}

export function getCarRequest(
    payload: GetCarRequestPayload,
): GetCarRequestAction {
    return {
        type: GetCarActionTypes.REQUEST,
        payload,
    };
}

export function getCarSuccess(
    payload: GetCarSuccessPayload,
): GetCarSuccessAction {
    return {
        type: GetCarActionTypes.SUCCESS,
        payload,
    };
}
