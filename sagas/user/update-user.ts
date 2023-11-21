import type { UpdateUserRequestAction } from '@actions/hr/user/update-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import usersService from '@services/usersService';
import {
    UpdateUserActionTypes,
    updateUserSuccess,
} from '@actions/hr/user/update-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* updateUserSaga({ payload }: UpdateUserRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(usersService.beforeUpdateUser, rest);

    const { Message } = data;

    if (Message !== 'Success') {
        alert(Message);
    }

    yield put(updateUserSuccess());

    return data;
}

export function* watchUpdateUser() {
    yield takeEvery(
        UpdateUserActionTypes.REQUEST,
        commonMiddleware(updateUserSaga),
    );
}
