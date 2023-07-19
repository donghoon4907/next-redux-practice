import { all, fork } from 'redux-saga/effects';

import { watchUpload } from './upload';
import { watchUploadImage } from './image';
import { watchUploadPortrait } from './portrait';

export function* uploadSaga() {
    yield all([
        fork(watchUpload),
        fork(watchUploadImage),
        fork(watchUploadPortrait),
    ]);
}
