import type { GetUserRequestAction } from '@actions/hr/user/get-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import usersService from '@services/usersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetUserActionTypes,
    getUserSuccess,
} from '@actions/hr/user/get-user.action';

function* getUserSaga({ payload }: GetUserRequestAction) {
    const { data } = yield call(usersService.getUser, payload);

    yield put(getUserSuccess(data));

    return data;
}

export function* watchGetUser() {
    yield takeEvery(GetUserActionTypes.REQUEST, commonMiddleware(getUserSaga));
}
