import { all, fork } from 'redux-saga/effects';

import { watchCreateCustomer } from './create-customer';

export function* customerSaga() {
    yield all([fork(watchCreateCustomer)]);
}
