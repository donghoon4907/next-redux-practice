import type { Reducer } from 'redux';
import produce from 'immer';
import { UploadActionTypes } from '@actions/upload/upload.action';

export interface UploadState {
    // recentUploadedImage: string | null;
}

const initialState: UploadState = {
    // recentUploadedImage: null,
};

export const uploadReducer: Reducer<UploadState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            // case UploadActionTypes.SUCCESS: {
            //     draft.recentUploadedImage = action.payload.fileName;
            //     break;
            // }
            default:
                return state;
        }
    });
