import type { LogoutRequestAction } from '@actions/hr/logout.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { deleteCookie } from 'cookies-next';
import hrsService from '@services/hrsService';
import { LogoutActionTypes, logoutSuccess } from '@actions/hr/logout.action';
import { commonMiddleware } from '@utils/generators/common';

function* logoutSaga(action: LogoutRequestAction) {
    const { data } = yield call(hrsService.beforeLogout);

    const cookieKey = process.env.COOKIE_TOKEN_KEY || '';

    deleteCookie(cookieKey);

    location.replace('/login');

    yield put(logoutSuccess());
}

export function* watchLogout() {
    yield takeEvery(LogoutActionTypes.REQUEST, commonMiddleware(logoutSaga));
}
