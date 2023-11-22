import type { LoginRequestAction } from '@actions/user/login.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setCookie } from 'cookies-next';
import usersService from '@services/usersService';
import { LoginActionTypes, loginSuccess } from '@actions/user/login.action';
import { sagaError } from '@actions/error/error.action';
import { commonMiddleware } from '@utils/generators/common';
import { isEmpty } from '@utils/validator/common';

function* loginSaga({ payload }: LoginRequestAction) {
    const { data } = yield call(usersService.login, payload);

    const { access_token, message } = data;

    if (access_token) {
        const tokenKey = process.env.COOKIE_TOKEN_KEY;
        if (isEmpty(tokenKey)) {
            return alert('error: COOKIE_TOKEN_KEY is empty');
        } else {
            setCookie(tokenKey!, access_token, {
                maxAge: 60 * 60 * 24,
            });
        }

        yield put(loginSuccess());

        return access_token;
    } else {
        const statusCode = 403;

        yield put(sagaError({ message, statusCode }));

        alert(message);

        throw new Error(message);
    }
}

export function* watchLogin() {
    yield takeEvery(LoginActionTypes.REQUEST, commonMiddleware(loginSaga));
}
