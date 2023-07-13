import type { CreatePostRequestAction } from '@actions/board/create-post.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import boardsService from '@services/boardsService';
import {
    CreatePostActionTypes,
    createPostSuccess,
} from '@actions/board/create-post.action';
import { commonMiddleware } from '@utils/generators/common';

function* createPostSaga({ payload }: CreatePostRequestAction) {
    const { data } = yield call(boardsService.createPost, payload);

    yield put(createPostSuccess(data));

    alert('test');

    return null;
}

export function* watchCreatePost() {
    yield takeEvery(
        CreatePostActionTypes.REQUEST,
        commonMiddleware(createPostSaga),
    );
}
