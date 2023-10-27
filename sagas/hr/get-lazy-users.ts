import type { User } from '@models/user';
import type { GetUsersRequestAction } from '@actions/hr/get-users';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetLazyUsersActionTypes,
    getLazyUsersSuccess,
} from '@actions/hr/get-lazy-users';

function* getLazyUsersSaga({ payload }: GetUsersRequestAction) {
    const { data } = yield call(hrsService.beforeGetUsers, payload);

    const users = data.map((v: User) => ({
        label: v.name,
        value: v.userid,
    }));

    yield put(getLazyUsersSuccess(users));

    return users;
}

export function* watchGetLazyUsers() {
    yield takeEvery(
        GetLazyUsersActionTypes.REQUEST,
        commonMiddleware(getLazyUsersSaga),
    );
}
