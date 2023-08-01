import type { Reducer } from 'redux';
import type { UploadedFile } from '@models/upload';
import produce from 'immer';
import { UploadActionTypes } from '@actions/upload/upload.action';
import { UploadImageActionTypes } from '@actions/upload/image.action';
import { UploadPortraitActionTypes } from '@actions/upload/portrait.action';

export interface UploadState {
    /**
     * 멀티 업로드 - 업로드된 파일 목록
     */
    uploadedFiles: UploadedFile[];
    /**
     * 단일 사진 업로드 - 최근 업로드된 사진
     */
    lastUploadedImage: string;
    /**
     * 단일 사진 업로드 - 최근 업로드된 프로필 사진
     */
    lastUploadedPortraitImage: string;
    /**
     * 단일 사진 업로드 - 최근 설정된 프로필 사진(파일)
     */
    lastSetPortraitImageFile: File | null;
    /**
     * 단일 사진 업로드 - 최근 설정된 프로필 사진(파일)
     */
    lastSetPortraitImagePreview: string | null;
}

const initialState: UploadState = {
    uploadedFiles: [],
    lastUploadedImage: '',
    lastUploadedPortraitImage: '',
    lastSetPortraitImageFile: null,
    lastSetPortraitImagePreview: null,
};

export const uploadReducer: Reducer<UploadState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case UploadActionTypes.PREPARE: {
                draft.uploadedFiles = draft.uploadedFiles.concat(
                    action.payload,
                );

                break;
            }
            case UploadActionTypes.SUCCESS: {
                draft.uploadedFiles[action.payload.index] = {
                    ...draft.uploadedFiles[action.payload.index],
                    progress: 100,
                    filename: action.payload.filename,
                };

                break;
            }
            case UploadActionTypes.PROGRESS: {
                draft.uploadedFiles[action.payload.index] = {
                    ...draft.uploadedFiles[action.payload.index],
                    progress: action.payload,
                };

                break;
            }
            case UploadImageActionTypes.SUCCESS: {
                draft.lastUploadedImage = action.payload;

                break;
            }
            case UploadPortraitActionTypes.SUCCESS: {
                draft.lastUploadedPortraitImage = action.payload;

                break;
            }
            case UploadPortraitActionTypes.UPDATE: {
                draft.lastSetPortraitImageFile = action.payload.file;

                draft.lastSetPortraitImagePreview = action.payload.preview;

                break;
            }
            default:
                return state;
        }
    });
