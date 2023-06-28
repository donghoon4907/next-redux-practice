import type { Reducer } from 'redux';
import produce from 'immer';
import { UploadImageActionTypes } from '@actions/upload/image.action';

export interface UploadState {
    recentUploadedImage: string | null;
}

const initialState: UploadState = {
    recentUploadedImage: null,
};

export const uploadReducer: Reducer<UploadState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case UploadImageActionTypes.SUCCESS: {
                draft.recentUploadedImage = action.payload.fileName;
                break;
            }
            default:
                return state;
        }
    });
