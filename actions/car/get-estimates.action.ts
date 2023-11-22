import type { Action } from 'redux';
import type { CorePaginateSuccessPayload, CorePayload } from '@interfaces/core';

export const GET_ESTIMATES_KEY = 'GET_ESTIMATES';

export const GetEstimatesActionTypes = {
    REQUEST: `${GET_ESTIMATES_KEY}_REQUEST`,
    SUCCESS: `${GET_ESTIMATES_KEY}_SUCCESS`,
    FAILURE: `${GET_ESTIMATES_KEY}_FAILURE`,
} as const;

export interface GetEstimatesRequestPayload extends CorePayload {
    userid: string;
    bo_datefrom: string;
}

export interface GetEstimatesSuccessPayload
    extends CorePaginateSuccessPayload<GetEstimatesRequestPayload> {}

export interface GetEstimatesRequestAction extends Action<string> {
    payload: GetEstimatesRequestPayload;
}

export interface GetEstimatesSuccessAction extends Action<string> {
    payload: GetEstimatesSuccessPayload;
}

export function getEstimatesRequest(
    payload: GetEstimatesRequestPayload,
): GetEstimatesRequestAction {
    return {
        type: GetEstimatesActionTypes.REQUEST,
        payload,
    };
}

export function getEstimatesSuccess(
    payload: GetEstimatesSuccessPayload,
): GetEstimatesSuccessAction {
    return {
        type: GetEstimatesActionTypes.SUCCESS,
        payload,
    };
}
