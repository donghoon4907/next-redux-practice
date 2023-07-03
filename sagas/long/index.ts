import { all, fork } from 'redux-saga/effects';

import { watchGetLong } from './get-long';

export function* longSaga() {
    yield all([fork(watchGetLong)]);
}
