import { all, fork } from 'redux-saga/effects';

import { watchDemo } from './demo';
import { watchGetBasicPayments } from './get-basic-payments';
import { watchGetOverrides } from './get-overrides';

export function* demoSaga() {
    yield all([
        fork(watchDemo),
        fork(watchGetBasicPayments),
        fork(watchGetOverrides),
    ]);
}
