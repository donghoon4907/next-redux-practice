import { all, fork } from 'redux-saga/effects';

import { watchGetContractor } from './get-contractor';

export function* contractSaga() {
    yield all([fork(watchGetContractor)]);
}
