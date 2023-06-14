import { all, fork } from 'redux-saga/effects';
import axios from 'axios';

import { watchDemo } from './demo';

axios.defaults.baseURL = 'http://localhost:3000';

if (typeof window !== 'undefined') {
    // const token = getCookie(COOKIE_TOKEN_KEY);
    // if (token) {
    //     axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    // } else {
    //     axios.defaults.headers.common['authorization'] = 'Non-login';
    // }
}

export function* demoSaga() {
    yield all([fork(watchDemo)]);
}
