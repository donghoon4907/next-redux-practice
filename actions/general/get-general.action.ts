import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_GENERAL_KEY = 'GET_GENERAL';

export const GetGeneralActionTypes = {
    REQUEST: `${GET_GENERAL_KEY}_REQUEST`,
    SUCCESS: `${GET_GENERAL_KEY}_SUCCESS`,
    FAILURE: `${GET_GENERAL_KEY}_FAILURE`,
} as const;

export interface GetGeneralRequestPayload extends CorePayload {
    idx: string;
}

export type GetGeneralSuccessPayload = Record<string, any>;

export interface GetGeneralRequestAction extends Action<string> {
    payload: GetGeneralRequestPayload;
}

export interface GetGeneralSuccessAction extends Action<string> {
    payload: GetGeneralSuccessPayload;
}

export function getGeneralRequest(
    payload: GetGeneralRequestPayload,
): GetGeneralRequestAction {
    return {
        type: GetGeneralActionTypes.REQUEST,
        payload,
    };
}

export function getGeneralSuccess(
    payload: GetGeneralSuccessPayload,
): GetGeneralSuccessAction {
    return {
        type: GetGeneralActionTypes.SUCCESS,
        payload,
    };
}
