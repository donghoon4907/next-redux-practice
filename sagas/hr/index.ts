import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create-user';
import { watchGetOrgas } from './get-orgas';
import { watchGetUsers } from './get-users';
// import { watchGetPermission } from './get-permission';
// import { watchGetIp } from './get-ip';

export function* hrSaga() {
    yield all([
        fork(watchLogin),
        fork(watchCreateUser),
        fork(watchGetOrgas),
        fork(watchGetUsers),
        // fork(watchGetPermission),
        // fork(watchGetIp),
    ]);
}
