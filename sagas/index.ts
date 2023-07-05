import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import { demoSaga } from './demo';
import { longSaga } from './long';
import { boardSaga } from './board';
import { uploadSaga } from './upload';
import { userSaga } from './user';

axios.defaults.baseURL = process.env.BACKEND_DOMAIN;
// 클라이언트 환경인 경우
if (typeof window !== 'undefined') {
    const token = getCookie(process.env.COOKIE_TOKEN_KEY || '');
    if (token) {
        axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    } else {
        axios.defaults.headers.common['authorization'] = 'Bearer Non-members';
    }
}

export function* rootSaga() {
    yield all([
        call(demoSaga),
        call(longSaga),
        call(boardSaga),
        call(uploadSaga),
        call(userSaga),
    ]);
}
