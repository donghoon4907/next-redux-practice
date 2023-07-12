import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const UPLOAD_KEY = 'WR-UPLOAD';

export const UploadActionTypes = {
    REQUEST: `${UPLOAD_KEY}_REQUEST`,
    PREPARE: `${UPLOAD_KEY}_PREPARE`,
    SUCCESS: `${UPLOAD_KEY}_SUCCESS`,
    FAILURE: `${UPLOAD_KEY}_FAILURE`,
    PROGRESS: `${UPLOAD_KEY}_PROGRESS`,
} as const;

export interface UploadRequestPayload extends CorePayload {
    category: string;
    formData: FormData;
    lastIndex: number;
}

export type UploadPreparePayload = {
    index: number;
    // origin: string;
    progress: number;
    file: File;
}[];

export interface UploadProgressPayload {
    index: number;
    progress: number;
}

export interface UploadSuccessPayload {
    index: number;
    filename: string;
}

export interface UploadRequestAction extends Action<string> {
    payload: UploadRequestPayload;
}

export interface UploadPrepareAction extends Action<string> {
    payload: UploadPreparePayload;
}

export interface UploadSuccessAction extends Action<string> {
    payload: UploadSuccessPayload;
}

export interface UploadProgressAction extends Action<string> {
    payload: number;
}

export function uploadRequest(
    payload: UploadRequestPayload,
): UploadRequestAction {
    return {
        type: UploadActionTypes.REQUEST,
        payload,
    };
}

export function uploadPrepare(
    payload: UploadPreparePayload,
): UploadPrepareAction {
    return {
        type: UploadActionTypes.PREPARE,
        payload,
    };
}

export function uploadSuccess(
    payload: UploadSuccessPayload,
): UploadSuccessAction {
    return {
        type: UploadActionTypes.SUCCESS,
        payload,
    };
}

export function uploadProgress(payload: number): UploadProgressAction {
    return {
        type: UploadActionTypes.PROGRESS,
        payload,
    };
}
