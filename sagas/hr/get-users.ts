import type { User } from '@models/user';
import type { GetUsersRequestAction } from '@actions/hr/get-users';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import { GetUsersActionTypes, getUsersSuccess } from '@actions/hr/get-users';

function* getUsersSaga({ payload }: GetUsersRequestAction) {
    const { data } = yield call(hrsService.getUsers, payload);

    const fcs = data.map((v: User) => ({
        label: v.name,
        value: v.userid,
    }));

    yield put(getUsersSuccess(fcs));

    return data;
}

export function* watchGetUsers() {
    yield takeEvery(
        GetUsersActionTypes.REQUEST,
        commonMiddleware(getUsersSaga),
    );
}