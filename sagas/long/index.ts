import { all, fork } from 'redux-saga/effects';

import { watchGetLongs } from './get-longs';
import { watchGetLong } from './get-long';
import { watchCreateLong } from './create-long';
import { watchUpdateLong } from './update-long';
import { watchUploadLong } from './upload-long';
import { watchGetLongFields } from './get-long-fields';
import { watchGetLongSils } from './get-long-sils';
import { watchGetLongSilhyos } from './get-long-silhyos';
import { watchGetLongBuhwals } from './get-long-buhwal';

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
        fork(watchGetLongFields),
    ]);
}
