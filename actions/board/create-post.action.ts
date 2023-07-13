import { CorePayload } from '@interfaces/core';
import { Attach } from '@models/upload';
import { Action } from 'redux';

export const CREATE_POST_KEY = 'CREATE_POST';

export const CreatePostActionTypes = {
    REQUEST: `${CREATE_POST_KEY}_REQUEST`,
    SUCCESS: `${CREATE_POST_KEY}_SUCCESS`,
    FAILURE: `${CREATE_POST_KEY}_FAILURE`,
} as const;

export interface CreatePostRequestPayload extends CorePayload {
    wcode: string;
    type: string;
    orga_rank?: number;
    title: string;
    body?: string;
    attach?: Attach[];
    viewonly?: string[];
    commentable?: boolean;
    pushable?: boolean;
    tags?: string;
    topfix?: boolean;
}

export interface CreatePostSuccessPayload {}

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
