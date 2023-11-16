import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const GET_LONG_BUHWALS_KEY = 'GET_LONG_BUHWALS';

export const GetLongBuhwalsActionTypes = {
    REQUEST: `${GET_LONG_BUHWALS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONG_BUHWALS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONG_BUHWALS_KEY}_FAILURE`,
} as const;

export interface GetLongBuhwalsRequestPayload
    extends CorePayload,
        CorePaginateOption {}

export interface GetLongBuhwalsSuccessPayload
    extends CorePaginateSuccessPayload<GetLongBuhwalsRequestPayload> {}

export interface GetLongBuhwalsRequestAction extends Action<string> {
    payload: GetLongBuhwalsRequestPayload;
}

export interface GetLongBuhwalsSuccessAction extends Action<string> {
    payload: GetLongBuhwalsSuccessPayload;
}

export function getLongBuhwalsRequest(
    payload: GetLongBuhwalsRequestPayload,
): GetLongBuhwalsRequestAction {
    return {
        type: GetLongBuhwalsActionTypes.REQUEST,
        payload,
    };
}

export function getLongBuhwalsSuccess(
    payload: GetLongBuhwalsSuccessPayload,
): GetLongBuhwalsSuccessAction {
    return {
        type: GetLongBuhwalsActionTypes.SUCCESS,
        payload,
    };
}
