import { all, fork } from 'redux-saga/effects';

import { watchGetLongs } from './get-longs';
import { watchGetLong } from './get-long';
import { watchCreateLong } from './create-long';
import { watchUpdateLong } from './update-long';
import { watchUploadLong } from './upload-long';
import { watchGetLongSils } from './get-sils';
import { watchGetLongSilhyos } from './get-silhyos';
import { watchGetLongBuhwals } from './get-buhwal';

export function* longSaga() {
    yield all([
        fork(watchGetLongs),
        fork(watchGetLongSils),
        fork(watchGetLongSilhyos),
        fork(watchGetLongBuhwals),
        fork(watchGetLong),
        fork(watchCreateLong),
        fork(watchUpdateLong),
        fork(watchUploadLong),
    ]);
}
