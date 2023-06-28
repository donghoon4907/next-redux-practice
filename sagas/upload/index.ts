import { all, fork } from 'redux-saga/effects';

import { watchUploadImage } from './image';

export function* uploadSaga() {
    yield all([fork(watchUploadImage)]);
}
