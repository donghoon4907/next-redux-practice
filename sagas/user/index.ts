import { all, fork } from 'redux-saga/effects';

import { watchCreateUser } from './create-user';
import { watchGetUsers } from './get-users';
import { watchUpdateUser } from './update-user';
import { watchSearchUsers } from './search-users';
import { watchGetLazyUsers } from './get-lazy-users';
import { watchLogin } from './login';
import { watchLogout } from './logout';

export function* userSaga() {
    yield all([
        fork(watchCreateUser),
        fork(watchUpdateUser),
        fork(watchGetUsers),
        fork(watchSearchUsers),
        fork(watchGetLazyUsers),
        fork(watchLogin),
        fork(watchLogout),
    ]);
}
