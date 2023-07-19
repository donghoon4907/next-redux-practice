import type { LoginRequestAction } from '@actions/hr/login.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { setCookie } from 'cookies-next';
import hrsService from '@services/hrsService';
import { LoginActionTypes, loginSuccess } from '@actions/hr/login.action';
import { sagaError } from '@actions/error/error.action';
import { commonMiddleware } from '@utils/generators/common';

function* loginSaga({ payload }: LoginRequestAction) {
    const { data } = yield call(hrsService.login, payload);

    const { access_token, Message: message } = data;

    if (access_token) {
        const cookieKey = process.env.COOKIE_TOKEN_KEY || '';

        setCookie(cookieKey, access_token);

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
