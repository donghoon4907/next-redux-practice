import type { User } from '@models/user';
import type { GetUsersRequestAction } from '@actions/user/get-users.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import usersService from '@services/usersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetLazyUsersActionTypes,
    getLazyUsersSuccess,
} from '@actions/user/get-lazy-users.action';

function* getLazyUsersSaga({ payload }: GetUsersRequestAction) {
    const { data } = yield call(usersService.beforeGetUsers, payload);

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
