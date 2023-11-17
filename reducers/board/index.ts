import type { Reducer } from 'redux';
import type { User } from '@models/user';
import produce from 'immer';
import { GetPostActionTypes } from '@actions/board/get-post.action';
import { ViewerActionTypes } from '@actions/board/set-viewer.action';

export interface BoardState {
    /**
     * 게시물 상세 페이지 정보
     */
    board: any;
    /**
     * 조회 대상 목록
     */
    viewer: User[];
}

const initialState: BoardState = {
    board: {},
    viewer: [],
};

export const boardReducer: Reducer<BoardState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetPostActionTypes.SUCCESS: {
                draft.board = action.payload;

                break;
            }
            case ViewerActionTypes.UPDATE: {
                draft.viewer = action.payload;

                break;
            }
            default:
                return state;
        }
    });
