import type { Action } from 'redux';
import { UploadRequestPayload } from './upload.action';

export const UPLOAD_PORTRAIT_KEY = 'UPLOAD-PORTRAIT';

export const UploadPortraitActionTypes = {
    REQUEST: `${UPLOAD_PORTRAIT_KEY}_REQUEST`,
    SUCCESS: `${UPLOAD_PORTRAIT_KEY}_SUCCESS`,
    FAILURE: `${UPLOAD_PORTRAIT_KEY}_FAILURE`,
    UPDATE: `${UPLOAD_PORTRAIT_KEY}_UPDATE`,
} as const;

export interface UploadPortraitRequestPayload
    extends Pick<UploadRequestPayload, 'formData'> {
    userid: string;
}

export interface UploadPortraitSuccessPayload {
    filename: string;
}

export interface UploadPortraitUpdatePayload {
    file: File;
    preview: string;
}

export interface UploadPortraitRequestAction extends Action<string> {
    payload: UploadPortraitRequestPayload;
}

export interface UploadPortraitSuccessAction extends Action<string> {
    payload: UploadPortraitSuccessPayload;
}

export interface UploadPortraitUpdateAction extends Action<string> {
    payload: UploadPortraitUpdatePayload;
}

export function uploadPortraitRequest(
    payload: UploadPortraitRequestPayload,
): UploadPortraitRequestAction {
    return {
        type: UploadPortraitActionTypes.REQUEST,
        payload,
    };
}

export function uploadPortraitSuccess(
    payload: UploadPortraitSuccessPayload,
): UploadPortraitSuccessAction {
    return {
        type: UploadPortraitActionTypes.SUCCESS,
        payload,
    };
}

export function uploadPortraitUpdate(
    payload: UploadPortraitUpdatePayload,
): UploadPortraitUpdateAction {
    return {
        type: UploadPortraitActionTypes.UPDATE,
        payload,
    };
}
