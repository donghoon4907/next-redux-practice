import { all, fork } from 'redux-saga/effects';

import { watchCreateGeneral } from './create-general';

export function* generalSaga() {
    yield all([fork(watchCreateGeneral)]);
}
