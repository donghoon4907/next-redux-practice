import type { LoginRequestAction } from '@actions/user/login.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setCookie } from 'cookies-next';
import axios, { AxiosError } from 'axios';
import usersService from '@services/usersService';
import { LoginActionTypes, loginSuccess } from '@actions/user/login.action';
import { sagaError } from '@actions/error/error.action';

function* loginSaga({ payload }: LoginRequestAction) {
    try {
        const { data } = yield call(usersService.login, payload);

        const { access_token, Message } = data;

        if (access_token) {
            alert('로그인 성공');

            const cookieKey = process.env.COOKIE_TOKEN_KEY || '';

            setCookie(cookieKey, access_token);

            yield put(loginSuccess());

            payload.callback?.(null);
        } else {
            const message = Message;

            const statusCode = 403;

            yield put(sagaError({ message, statusCode }));

            alert(message);
        }
        // 클라이언트 전송 실수 혹은 500 에러
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;

            const { message } = axiosError;

            const statusCode = axiosError.response?.status || -1;

            yield put(sagaError({ message, statusCode }));
        }
    }
}

export function* watchLogin() {
    yield takeEvery(LoginActionTypes.REQUEST, loginSaga);
}
