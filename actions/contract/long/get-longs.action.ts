import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
    CoreSelectOption,
} from '@interfaces/core';

export const GET_LONGS_KEY = 'GET_LONGS';

export const GetLongsActionTypes = {
    REQUEST: `${GET_LONGS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONGS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONGS_KEY}_FAILURE`,
} as const;

export interface GetLongsRequestPayload
    extends CorePayload,
        CorePaginateOption {
    condition?: {
        paydate?: Array<string>;
    };
}

export interface GetLongsSuccessPayload
    extends CorePaginateSuccessPayload<GetLongsRequestPayload> {
    ptitles: CoreSelectOption[];
}

export interface GetLongsRequestAction extends Action<string> {
    payload: GetLongsRequestPayload;
}

export interface GetLongsSuccessAction extends Action<string> {
    payload: GetLongsSuccessPayload;
}

export function getLongsRequest(
    payload: GetLongsRequestPayload,
): GetLongsRequestAction {
    return {
        type: GetLongsActionTypes.REQUEST,
        payload,
    };
}

export function getLongsSuccess(
    payload: GetLongsSuccessPayload,
): GetLongsSuccessAction {
    return {
        type: GetLongsActionTypes.SUCCESS,
        payload,
    };
}
