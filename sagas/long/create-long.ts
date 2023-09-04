import type { CreateLongRequestAction } from '@actions/contract/long/create-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateLongActionTypes,
    createLongSuccess,
} from '@actions/contract/long/create-long.action';

function* createLongSaga({ payload }: CreateLongRequestAction) {
    const { data } = yield call(longsService.createLong, payload);

    const { Message } = data;

    if (Message === 'Success') {
        alert('등록되었습니다.');
    } else {
        alert(Message);
    }

    yield put(createLongSuccess());

    return data;
}

export function* watchCreateLong() {
    yield takeEvery(
        CreateLongActionTypes.REQUEST,
        commonMiddleware(createLongSaga),
    );
}
