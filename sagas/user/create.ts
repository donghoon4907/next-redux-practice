import type { CreateUserRequestAction } from '@actions/user/create.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import usersService from '@services/usersService';
import { sagaError } from '@actions/error/error.action';
import {
    CreateUserActionTypes,
    createUserSuccess,
} from '@actions/user/create.action';

function* createUserSaga({ payload }: CreateUserRequestAction) {
    try {
        const { data } = yield call(usersService.createUser, payload);

        const { userid } = data;

        let message;
        if (userid) {
            yield put(createUserSuccess());

            message = '사용자가 등록되었습니다.';
        } else {
            message = 'userid is not found';
        }

        alert(message);
        // 클라이언트 전송 실수 혹은 500 에러
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;

            const { message } = axiosError;

            const statusCode = axiosError.response?.status || -1;

            yield put(sagaError({ message, statusCode }));
        }
    }
}

export function* watchCreateUser() {
    yield takeEvery(CreateUserActionTypes.REQUEST, createUserSaga);
}
