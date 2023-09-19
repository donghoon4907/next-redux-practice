import type { UpdateUserRequestAction } from '@actions/hr/update-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    UpdateUserActionTypes,
    updateUserSuccess,
} from '@actions/hr/update-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* updateUserSaga({ payload }: UpdateUserRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeUpdateUser, rest);

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
