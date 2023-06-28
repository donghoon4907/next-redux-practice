import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_POST_KEY = 'GET_POST';

export const GetPostActionTypes = {
    REQUEST: `${GET_POST_KEY}_REQUEST`,
    SUCCESS: `${GET_POST_KEY}_SUCCESS`,
    FAILURE: `${GET_POST_KEY}_FAILURE`,
} as const;

export interface GetPostRequestPayload extends CorePayload {
    id: string;
}

export interface GetPostSuccessPayload {
    fields: any;
    data: any;
}

export interface GetPostRequestAction extends Action<string> {
    payload: GetPostRequestPayload;
}

export interface GetPostSuccessAction extends Action<string> {
    payload: GetPostSuccessPayload;
}

export function getPostRequest(
    payload: GetPostRequestPayload,
): GetPostRequestAction {
    return {
        type: GetPostActionTypes.REQUEST,
        payload,
    };
}

export function getPostSuccess(
    payload: GetPostSuccessPayload,
): GetPostSuccessAction {
    return {
        type: GetPostActionTypes.SUCCESS,
        payload,
    };
}
