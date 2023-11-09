import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_ESTIMATE_KEY = 'GET_ESTIMATE';

export const GetEstimateActionTypes = {
    REQUEST: `${GET_ESTIMATE_KEY}_REQUEST`,
    SUCCESS: `${GET_ESTIMATE_KEY}_SUCCESS`,
    FAILURE: `${GET_ESTIMATE_KEY}_FAILURE`,
} as const;

export interface GetEstimateRequestPayload extends CorePayload {
    idx: string;
}

export type GetEstimateSuccessPayload = Record<string, any>;

export interface GetEstimateRequestAction extends Action<string> {
    payload: GetEstimateRequestPayload;
}

export interface GetEstimateSuccessAction extends Action<string> {
    payload: GetEstimateSuccessPayload;
}

export function getEstimateRequest(
    payload: GetEstimateRequestPayload,
): GetEstimateRequestAction {
    return {
        type: GetEstimateActionTypes.REQUEST,
        payload,
    };
}

export function getEstimateSuccess(
    payload: GetEstimateSuccessPayload,
): GetEstimateSuccessAction {
    return {
        type: GetEstimateActionTypes.SUCCESS,
        payload,
    };
}
