import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import { demoSaga } from '@sagas/demo';

// axios.defaults.baseURL = process.env.BACKEND_DOMAIN + '/v1';
// 클라이언트 환경인 경우
if (typeof window !== 'undefined') {
    // const token = getCookie(COOKIE_TOKEN_KEY);
    // if (token) {
    //     axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    // } else {
    //     axios.defaults.headers.common['authorization'] = 'Non-login';
    // }
}

export function* rootSaga() {
    yield all([call(demoSaga)]);
}
