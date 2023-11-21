import type { GetUserRequestAction } from '@actions/hr/get-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetUserActionTypes,
    getUserSuccess,
} from '@actions/hr/get-user.action';

function* getUserSaga({ payload }: GetUserRequestAction) {
    const { data } = yield call(hrsService.getUser, payload);

    yield put(getUserSuccess(data));

    return data;
}

export function* watchGetUser() {
    yield takeEvery(GetUserActionTypes.REQUEST, commonMiddleware(getUserSaga));
}
