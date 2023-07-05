import { all, fork } from 'redux-saga/effects';

import { watchGetLongs } from './get-longs';
import { watchGetLong } from './get-long';

export function* longSaga() {
    yield all([fork(watchGetLongs), fork(watchGetLong)]);
}
