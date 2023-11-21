import { all, fork } from 'redux-saga/effects';

import { watchLogin } from './login';
import { watchCreateUser } from './create-user';
import { watchGetOrgas } from './get-orgas';
import { watchGetLazyOrgas } from './get-lazy-orgas';
import { watchGetUsers } from './get-users';
import { watchGetCompanies } from './get-companies';
import { watchUpdateUser } from './update-user';
import { watchGetCompanyRegNum } from './get-company-regnum';
import { watchGetProducts } from './get-products';
import { watchSearchUsers } from './search-users';
import { watchSearchOrgas } from './search-orgas';
import { watchLogout } from './logout';
import { watchCreateOrga } from './create-orga';
import { watchGetOrga } from './get-orga';
import { watchGetLazyUsers } from './get-lazy-users';
import { watchUpdateOrga } from './update-orga';
// import { watchGetPermission } from './get-permission';
// import { watchGetIp } from './get-ip';
// import { watchGetUser } from './get-user';

export function* hrSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
        fork(watchCreateOrga),
        fork(watchUpdateOrga),
        fork(watchCreateUser),
        fork(watchUpdateUser),
        fork(watchGetOrgas),
        fork(watchGetLazyOrgas),
        fork(watchGetOrga),
        fork(watchGetLazyUsers),
        fork(watchGetUsers),
        // fork(watchGetUser),
        fork(watchGetCompanies),
        fork(watchGetCompanyRegNum),
        fork(watchGetProducts),
        fork(watchSearchUsers),
        fork(watchSearchOrgas),
        // fork(watchGetPermission),
        // fork(watchGetIp),
    ]);
}
