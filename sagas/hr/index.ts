import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create-user';
import { watchGetOrgas } from './get-orgas';
import { watchGetOrga } from './get-orga';
import { watchGetUsers } from './get-users';
// import { watchGetBanks } from './get-banks';
import { watchGetCompanies } from './get-companies';
import { watchGetAgencies } from './get-agencies';
// import { watchGetUser } from './get-user';
import { watchUpdateUser } from './update-user';
import { watchGetCompanyRegNum } from './get-company-regnum';
// import { watchGetPermission } from './get-permission';
// import { watchGetIp } from './get-ip';

export function* hrSaga() {
    yield all([
        fork(watchLogin),
        fork(watchCreateUser),
        fork(watchUpdateUser),
        fork(watchGetOrgas),
        fork(watchGetOrga),
        fork(watchGetUsers),
        // fork(watchGetUser),
        fork(watchGetCompanies),
        fork(watchGetCompanyRegNum),
        // fork(watchGetBanks),
        fork(watchGetAgencies),
        // fork(watchGetPermission),
        // fork(watchGetIp),
    ]);
}
