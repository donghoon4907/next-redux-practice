import type { CreateUserRequestAction } from '@actions/hr/create-user.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    CreateUserActionTypes,
    createUserSuccess,
} from '@actions/hr/create-user.action';
import { commonMiddleware } from '@utils/generators/common';

function* createUserSaga({ payload }: CreateUserRequestAction) {
    const { data } = yield call(hrsService.createUser, payload);

    const { userid } = data;

    let message;
    if (userid) {
        yield put(createUserSuccess());

        message = '사용자가 등록되었습니다.';
    } else {
        message = 'userid is not received';
    }

    alert(message);

    return data;
}

export function* watchCreateUser() {
    yield takeEvery(
        CreateUserActionTypes.REQUEST,
        commonMiddleware(createUserSaga),
    );
}
