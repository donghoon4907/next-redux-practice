import type { LogoutRequestAction } from '@actions/user/logout.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteCookie } from 'cookies-next';
import usersService from '@services/usersService';
import { LogoutActionTypes, logoutSuccess } from '@actions/user/logout.action';
import { commonMiddleware } from '@utils/generators/common';

function* logoutSaga(action: LogoutRequestAction) {
    const { data } = yield call(usersService.beforeLogout);

    const cookieKey = process.env.COOKIE_TOKEN_KEY || '';

    deleteCookie(cookieKey);

    location.replace('/login');

    yield put(logoutSuccess());
}

export function* watchLogout() {
    yield takeEvery(LogoutActionTypes.REQUEST, commonMiddleware(logoutSaga));
}
