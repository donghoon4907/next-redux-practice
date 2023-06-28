import { all, fork } from 'redux-saga/effects';

import { watchGetPosts } from './get-posts';

export function* boardSaga() {
    yield all([fork(watchGetPosts)]);
}
