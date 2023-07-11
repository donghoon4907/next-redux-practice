import type { Reducer } from 'redux';
import type { GetPostsSuccessPayload } from '@actions/board/get-posts.action';
import produce from 'immer';
import { GetPostsActionTypes } from '@actions/board/get-posts.action';

export interface BoardState {
    boards: GetPostsSuccessPayload;
}

const initialState: BoardState = {
    boards: {
        fields: {
            idx: '번호',
            title: '제목',
            writer: '글쓴이',
            createdAt: '날짜',
            viewCount: '조회수',
        },
        rows: Array.from({ length: 30 }).map((_, i) => ({
            idx: `${i + 1}`,
            type: 'notice',
            title: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas',
            writer: '영업지원0813',
            createdAt: '2023.06.22',
            viewCount: '2,345,510',
        })),
        total: {
            count: 100000,
        },
        lastPayload: {
            nums: 25,
            page: 1,
        },
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
