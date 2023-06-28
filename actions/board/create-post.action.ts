import { CorePayload } from '@interfaces/core';
import { Action } from 'redux';

export const CREATE_POST_KEY = 'CREATE_POST';

export const CreatePostActionTypes = {
    REQUEST: `${CREATE_POST_KEY}_REQUEST`,
    SUCCESS: `${CREATE_POST_KEY}_SUCCESS`,
    FAILURE: `${CREATE_POST_KEY}_FAILURE`,
} as const;

export interface CreatePostRequestPayload extends CorePayload {
    type: string;
    company: string;
    title: string;
    author: any;
    body: string;
    in_attach: Array<any>;
    out_attach: Array<any>;
}

export interface CreatePostSuccessPayload {
    fields: any;
    data: any;
}

export interface CreatePostRequestAction extends Action<string> {
    payload: CreatePostRequestPayload;
}

export interface CreatePostSuccessAction extends Action<string> {
    payload: CreatePostSuccessPayload;
}

export function createPostRequest(
    payload: CreatePostRequestPayload,
): CreatePostRequestAction {
    return {
        type: CreatePostActionTypes.REQUEST,
        payload,
    };
}

export function createPostSuccess(
    payload: CreatePostSuccessPayload,
): CreatePostSuccessAction {
    return {
        type: CreatePostActionTypes.SUCCESS,
        payload,
    };
}
