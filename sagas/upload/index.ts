import { all, fork } from 'redux-saga/effects';

import { watchUpload } from './upload';

export function* uploadSaga() {
    yield all([fork(watchUpload)]);
}
