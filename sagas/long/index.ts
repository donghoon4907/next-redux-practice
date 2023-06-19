import { all, fork } from 'redux-saga/effects';

import { watchGetBasicPayments } from './get-basic-payments';
import { watchGetOverrides } from './get-overrides';

if (typeof window !== 'undefined') {
    // const token = getCookie(COOKIE_TOKEN_KEY);
    // if (token) {
    //     axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    // } else {
    //     axios.defaults.headers.common['authorization'] = 'Non-login';
    // }
}

export function* longSaga() {
    yield all([fork(watchGetBasicPayments), fork(watchGetOverrides)]);
}
