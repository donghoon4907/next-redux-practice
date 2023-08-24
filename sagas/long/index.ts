import { all, fork } from 'redux-saga/effects';

import { watchGetLongs } from './get-longs';
import { watchGetLong } from './get-long';
import { watchCreateLong } from './create-long';
import { watchUpdateLong } from './update-long';

export function* longSaga() {
    yield all([
        fork(watchGetLongs),
        fork(watchGetLong),
        fork(watchCreateLong),
        fork(watchUpdateLong),
    ]);
}
