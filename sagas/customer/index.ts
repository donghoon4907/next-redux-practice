import { all, fork } from 'redux-saga/effects';

import { watchCreateCustomer } from './create-customer';
import { watchUpdateCustomer } from './update-customer';
import { watchGetUserCustomers } from './get-user-customer';
import { watchGetCustomer } from './get-customer';

export function* customerSaga() {
    yield all([
        fork(watchCreateCustomer),
        fork(watchUpdateCustomer),
        fork(watchGetCustomer),
        fork(watchGetUserCustomers),
    ]);
}
