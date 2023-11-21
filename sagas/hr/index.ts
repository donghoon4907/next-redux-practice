import { all, fork } from 'redux-saga/effects';

import { watchGetCompanies } from './get-companies';
import { watchGetCompanyRegNum } from './get-company-regnum';
import { watchGetProducts } from './get-products';

export function* hrSaga() {
    yield all([
        fork(watchGetCompanies),
        fork(watchGetCompanyRegNum),
        fork(watchGetProducts),
    ]);
}
