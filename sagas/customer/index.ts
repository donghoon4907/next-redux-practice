import { all, fork } from 'redux-saga/effects';

import { watchCreateCustomer } from './create-customer';
import { watchUpdateCustomer } from './update-customer';

export function* customerSaga() {
    yield all([fork(watchCreateCustomer), fork(watchUpdateCustomer)]);
}
