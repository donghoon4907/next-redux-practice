import type { Action } from 'redux';
import type { CorePayload, CoreSelectOption } from '@interfaces/core';
import type { Response } from '@models/response';

export const GET_LONGS_KEY = 'GET_LONGS';

export const GetLongsActionTypes = {
    REQUEST: `${GET_LONGS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONGS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONGS_KEY}_FAILURE`,
} as const;

export interface GetLongsRequestPayload extends CorePayload {
    condition?: {
        paydate?: Array<string>;
    };
    page: number;
    nums: number;
}

export interface GetLongsSuccessPayload extends Response {
    ptitles: CoreSelectOption[];
    lastPayload: GetLongsRequestPayload | null;
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
