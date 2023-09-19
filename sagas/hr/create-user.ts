import type { CreateUserRequestAction } from '@actions/hr/create-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    CreateUserActionTypes,
    createUserSuccess,
} from '@actions/hr/create-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* createUserSaga({ payload }: CreateUserRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeCreateUser, rest);

    const { userid, Message } = data;

    if (!userid) {
        alert(Message);
    }

    yield put(createUserSuccess());

    return data;
}

export function* watchCreateUser() {
    yield takeEvery(
        CreateUserActionTypes.REQUEST,
        commonMiddleware(createUserSaga),
    );
}
