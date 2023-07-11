import { CorePayload } from '@interfaces/core';
import { Action } from 'redux';

export const UPLOAD_KEY = 'WR-UPLOAD';

export const UploadActionTypes = {
    REQUEST: `${UPLOAD_KEY}_REQUEST`,
    SUCCESS: `${UPLOAD_KEY}_SUCCESS`,
    FAILURE: `${UPLOAD_KEY}_FAILURE`,
} as const;

export interface UploadRequestPayload extends CorePayload {
    category: string;
    formData: FormData;
}

export interface UploadSuccessPayload {
    fileName: string;
}

export interface UploadRequestAction extends Action<string> {
    payload: UploadRequestPayload;
}

export interface UploadSuccessAction extends Action<string> {
    payload: UploadSuccessPayload;
}

export function uploadRequest(
    payload: UploadRequestPayload,
): UploadRequestAction {
    return {
        type: UploadActionTypes.REQUEST,
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
