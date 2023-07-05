import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create-user';
import { watchGetOrgas } from './get-orgas';

export function* hrSaga() {
    yield all([fork(watchLogin), fork(watchCreateUser), fork(watchGetOrgas)]);
}
