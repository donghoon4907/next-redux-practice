import type { Action } from 'redux';

export const IMAGE_UPLOAD_MODAL_KEY = 'IMAGE_UPLOAD_MODAL_KEY';

export const ImageUploadModalActionTypes = {
    SHOW: `SHOW_${IMAGE_UPLOAD_MODAL_KEY}`,
    HIDE: `HIDE_${IMAGE_UPLOAD_MODAL_KEY}`,
} as const;

export interface ImageUploadModalShowAction extends Action<string> {}

export interface ImageUploadModalHideAction extends Action<string> {}

export function showImageUploadModal(): ImageUploadModalShowAction {
    return {
        type: ImageUploadModalActionTypes.SHOW,
    };
}

export function hideImageUploadModal(): ImageUploadModalHideAction {
    return {
        type: ImageUploadModalActionTypes.HIDE,
    };
}
