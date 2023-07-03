import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';

export function* userSaga() {
    yield all([fork(watchLogin)]);
}
