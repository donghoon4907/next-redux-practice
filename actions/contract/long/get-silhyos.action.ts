import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const GET_LONG_SILHYOS_KEY = 'GET_LONG_SILHYOS';

export const GetLongSilhyosActionTypes = {
    REQUEST: `${GET_LONG_SILHYOS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONG_SILHYOS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONG_SILHYOS_KEY}_FAILURE`,
} as const;

export interface GetLongSilhyosRequestPayload
    extends CorePayload,
        CorePaginateOption {}

export interface GetLongSilhyosSuccessPayload
    extends CorePaginateSuccessPayload<GetLongSilhyosRequestPayload> {}

export interface GetLongSilhyosRequestAction extends Action<string> {
    payload: GetLongSilhyosRequestPayload;
}

export interface GetLongSilhyosSuccessAction extends Action<string> {
    payload: GetLongSilhyosSuccessPayload;
}

export function getLongSilhyosRequest(
    payload: GetLongSilhyosRequestPayload,
): GetLongSilhyosRequestAction {
    return {
        type: GetLongSilhyosActionTypes.REQUEST,
        payload,
    };
}

export function getLongSilhyosSuccess(
    payload: GetLongSilhyosSuccessPayload,
): GetLongSilhyosSuccessAction {
    return {
        type: GetLongSilhyosActionTypes.SUCCESS,
        payload,
    };
}
