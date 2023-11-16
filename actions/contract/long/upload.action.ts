import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const UPLOAD_LONG_KEY = 'UPLOAD_LONG';

export const UploadLongActionTypes = {
    REQUEST: `${UPLOAD_LONG_KEY}_REQUEST`,
    SUCCESS: `${UPLOAD_LONG_KEY}_SUCCESS`,
    FAILURE: `${UPLOAD_LONG_KEY}_FAILURE`,
} as const;

export interface UploadLongRequestPayload extends CorePayload {
    data: Array<Record<string, string>>;
}

export interface UploadLongRequestAction extends Action<string> {
    payload: UploadLongRequestPayload;
}

export interface UploadLongSuccessAction extends Action<string> {}

export function uploadLongRequest(
    payload: UploadLongRequestPayload,
): UploadLongRequestAction {
    return {
        type: UploadLongActionTypes.REQUEST,
        payload,
    };
}

export function uploadLongSuccess(): UploadLongSuccessAction {
    return {
        type: UploadLongActionTypes.SUCCESS,
    };
}
