import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const GET_LONG_SILS_KEY = 'GET_LONG_SILS';

export const GetLongSilsActionTypes = {
    REQUEST: `${GET_LONG_SILS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONG_SILS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONG_SILS_KEY}_FAILURE`,
} as const;

export interface GetLongSilsRequestPayload
    extends CorePayload,
        CorePaginateOption {}

export interface GetLongSilsSuccessPayload
    extends CorePaginateSuccessPayload<GetLongSilsRequestPayload> {}

export interface GetLongSilsRequestAction extends Action<string> {
    payload: GetLongSilsRequestPayload;
}

export interface GetLongSilsSuccessAction extends Action<string> {
    payload: GetLongSilsSuccessPayload;
}

export function getLongSilsRequest(
    payload: GetLongSilsRequestPayload,
): GetLongSilsRequestAction {
    return {
        type: GetLongSilsActionTypes.REQUEST,
        payload,
    };
}

export function getLongSilsSuccess(
    payload: GetLongSilsSuccessPayload,
): GetLongSilsSuccessAction {
    return {
        type: GetLongSilsActionTypes.SUCCESS,
        payload,
    };
}
