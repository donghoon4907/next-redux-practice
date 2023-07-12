import type { Reducer } from 'redux';
import type { UploadedFile } from '@models/upload';
import produce from 'immer';
import { UploadActionTypes } from '@actions/upload/upload.action';

export interface UploadState {
    uploadedFiles: UploadedFile[];
    // progress: number;
    // recentUploadedImage: string | null;
}

const initialState: UploadState = {
    uploadedFiles: [
        {
            index: 1,
            filename: '/teerserwer.png',
            progress: 100,
            file: {
                name: 'Tiger.PNG',
                size: 54030,
            },
        },
        {
            index: 2,
            filename: '/teerserwer.png',
            progress: 80,
            file: {
                name: 'Tiger.PNG',
                size: 54030,
            },
        },
        {
            index: 3,
            filename: '/teerserwer.png',
            progress: 0,
            file: {
                name: 'Tiger.PNG',
                size: 54030,
            },
        },
    ],
    // progress: 0,
    // recentUploadedImage: null,
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
            default:
                return state;
        }
    });
