import { all, fork } from 'redux-saga/effects';

import { watchGetBasicPayments } from './get-basic-payments';
import { watchGetOverrides } from './get-overrides';

export function* longSaga() {
    yield all([fork(watchGetBasicPayments), fork(watchGetOverrides)]);
}
