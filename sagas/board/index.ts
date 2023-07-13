import { all, fork } from 'redux-saga/effects';

import { watchCreatePost } from './create-post';

export function* boardSaga() {
    yield all([fork(watchCreatePost)]);
}
