import type { UpdateUserRequestAction } from '@actions/hr/update-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    UpdateUserActionTypes,
    updateUserSuccess,
} from '@actions/hr/update-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* updateUserSaga({ payload }: UpdateUserRequestAction) {
    const { data } = yield call(hrsService.updateUser, payload);

    const { Message } = data;

    let message;
    if (Message === 'Success') {
        message = '수정되었습니다.';
    } else {
        message = Message;
    }

    yield put(updateUserSuccess());

    alert(message);

    return data;
}

export function* watchUpdateUser() {
    yield takeEvery(
        UpdateUserActionTypes.REQUEST,
        commonMiddleware(updateUserSaga),
    );
}
