import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create';
import { watchGetOrgas } from './get-orga';

export function* userSaga() {
    yield all([fork(watchLogin), fork(watchCreateUser), fork(watchGetOrgas)]);
}
