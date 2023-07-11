import type { Action } from 'redux';
import type { CorePaginateSuccessPayload, CorePayload } from '@interfaces/core';

export const GET_POSTS_KEY = 'GET_POSTS';

export const GetPostsActionTypes = {
    REQUEST: `${GET_POSTS_KEY}_REQUEST`,
    SUCCESS: `${GET_POSTS_KEY}_SUCCESS`,
    FAILURE: `${GET_POSTS_KEY}_FAILURE`,
} as const;

export interface GetPostsRequestPayload extends CorePayload {
    page: number;
    nums: number;
}

export interface GetPostsSuccessPayload
    extends CorePaginateSuccessPayload<GetPostsRequestPayload> {}

export interface GetPostsRequestAction extends Action<string> {
    payload: GetPostsRequestPayload;
}

export interface GetPostsSuccessAction extends Action<string> {
    payload: GetPostsSuccessPayload;
}

export function getPostsRequest(
    payload: GetPostsRequestPayload,
): GetPostsRequestAction {
    return {
        type: GetPostsActionTypes.REQUEST,
        payload,
    };
}

export function getPostsSuccess(
    payload: GetPostsSuccessPayload,
): GetPostsSuccessAction {
    return {
        type: GetPostsActionTypes.SUCCESS,
        payload,
    };
}
