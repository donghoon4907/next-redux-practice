import type { Reducer } from 'redux';
import type { Response } from '@models/response';
import type { Board } from '@models/board';
import produce from 'immer';
import { GetPostsActionTypes } from '@actions/board/get-posts.action';

export interface BoardState {
    boards: Response;
}

const initialState: BoardState = {
    boards: {
        fields: [],
        rows: [],
        total: null,
    },
};

export const boardReducer: Reducer<BoardState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetPostsActionTypes.SUCCESS: {
                draft.boards.fields = action.payload.fields;

                draft.boards.rows = action.payload.data;

                draft.boards.total = action.payload.total;
                break;
            }
            default:
                return state;
        }
    });
