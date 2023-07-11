import type { Reducer } from 'redux';
import type { GetPostsSuccessPayload } from '@actions/board/get-posts.action';
import produce from 'immer';
import { GetPostsActionTypes } from '@actions/board/get-posts.action';

export interface BoardState {
    boards: GetPostsSuccessPayload;
}

const initialState: BoardState = {
    boards: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
};

export const boardReducer: Reducer<BoardState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetPostsActionTypes.SUCCESS: {
                draft.boards = action.payload;

                break;
            }
            default:
                return state;
        }
    });
