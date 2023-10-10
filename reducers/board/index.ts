import type { Reducer } from 'redux';
import type { GetPostsSuccessPayload } from '@actions/board/get-posts.action';
import type { User } from '@models/user';
import produce from 'immer';
import { GetPostsActionTypes } from '@actions/board/get-posts.action';
import { GetPostActionTypes } from '@actions/board/get-post.action';
import { ViewerActionTypes } from '@actions/board/set-viewer.action';

export interface BoardState {
    /**
     * 게시물 목록
     */
    boards: GetPostsSuccessPayload;
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
            title: '테스트 게시물',
            writer: '영업지원0813',
            createdAt: '2023-06-22',
            viewCount: 2345510,
        })),
        total: {
            count: 100000,
        },
        lastPayload: {
            nums: 25,
            page: 1,
        },
    },
    board: {},
    viewer: [],
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
