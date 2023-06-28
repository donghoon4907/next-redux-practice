import {
    type GetPostsRequestAction,
    GetPostsActionTypes,
} from '@actions/board/get-posts.action';
import { call, takeEvery } from 'redux-saga/effects';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import boardsService from '@services/boardsService';

function* getPostsSaga({ payload }: GetPostsRequestAction) {
    const { data } = yield call(boardsService.getPosts, payload);

    return data;
}

export function* watchGetPosts() {
    yield takeEvery(
        GetPostsActionTypes.REQUEST,
        convertDateMiddleware(getPostsSaga),
    );
}
