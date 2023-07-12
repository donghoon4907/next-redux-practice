import { all, fork } from 'redux-saga/effects';

import { watchUpload } from './upload';
import { watchUploadImage } from './image';

export function* uploadSaga() {
    yield all([fork(watchUpload), fork(watchUploadImage)]);
}
