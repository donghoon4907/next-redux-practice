import { all, fork } from 'redux-saga/effects';

import { watchCreateGeneral } from './create-general';
import { watchGetGeneral } from './get-general';
import { watchUpdateGeneral } from './update-general';

export function* generalSaga() {
    yield all([
        fork(watchCreateGeneral),
        fork(watchGetGeneral),
        fork(watchUpdateGeneral),
    ]);
}
