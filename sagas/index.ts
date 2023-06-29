import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import { demoSaga } from '@sagas/demo';
import { longSaga } from '@sagas/long';
import { boardSaga } from '@sagas/board';
import { uploadSaga } from '@sagas/upload';

axios.defaults.baseURL = 'http://127.0.0.1:3000';
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
    yield all([
        call(demoSaga),
        call(longSaga),
        call(boardSaga),
        call(uploadSaga),
    ]);
}
