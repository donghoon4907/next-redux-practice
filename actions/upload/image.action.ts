import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import { UploadRequestPayload } from './upload.action';

export const UPLOAD_IMAGE_KEY = 'UPLOAD-IMAGE';

export const UploadImageActionTypes = {
    REQUEST: `${UPLOAD_IMAGE_KEY}_REQUEST`,
    SUCCESS: `${UPLOAD_IMAGE_KEY}_SUCCESS`,
    FAILURE: `${UPLOAD_IMAGE_KEY}_FAILURE`,
} as const;

export interface UploadImageRequestPayload
    extends Pick<UploadRequestPayload, 'category' | 'formData'> {}

export interface UploadImageSuccessPayload {
    filename: string;
}

export interface UploadImageRequestAction extends Action<string> {
    payload: UploadImageRequestPayload;
}

export interface UploadImageSuccessAction extends Action<string> {
    payload: UploadImageSuccessPayload;
}

export function uploadImageRequest(
    payload: UploadImageRequestPayload,
): UploadImageRequestAction {
    return {
        type: UploadImageActionTypes.REQUEST,
        payload,
    };
}

export function uploadImageSuccess(
    payload: UploadImageSuccessPayload,
): UploadImageSuccessAction {
    return {
        type: UploadImageActionTypes.SUCCESS,
        payload,
    };
}
