import type { Action } from 'redux';
import type { CorePaginateSuccessPayload, CorePayload } from '@interfaces/core';

export const GET_OVERRIDES_KEY = 'GET_OVERRIDES';

export const GetOverridesActionTypes = {
    REQUEST: `${GET_OVERRIDES_KEY}_REQUEST`,
    SUCCESS: `${GET_OVERRIDES_KEY}_SUCCESS`,
    FAILURE: `${GET_OVERRIDES_KEY}_FAILURE`,
} as const;

export interface GetOverridesRequestPayload extends CorePayload {
    searchKeyword?: string;
    order?: string;
}

export interface GetOverridesSuccessPayload
    extends CorePaginateSuccessPayload<GetOverridesRequestPayload> {}

export interface GetOverridesRequestAction extends Action<string> {
    payload: GetOverridesRequestPayload;
}

export interface GetOverridesSuccessAction extends Action<string> {
    payload: GetOverridesSuccessPayload;
}

export function getOverridesRequest(
    payload: GetOverridesRequestPayload,
): GetOverridesRequestAction {
    return {
        type: GetOverridesActionTypes.REQUEST,
        payload,
    };
}

export function getOverridesSuccess(
    payload: GetOverridesSuccessPayload,
): GetOverridesSuccessAction {
    return {
        type: GetOverridesActionTypes.SUCCESS,
        payload,
    };
}
