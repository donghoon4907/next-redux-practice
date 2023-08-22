import type { CreateLongRequestAction } from '@actions/long/create-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateLongActionTypes,
    createLongSuccess,
} from '@actions/long/create-long.action';

function* createLongSaga({ payload }: CreateLongRequestAction) {
    const { data } = yield call(longsService.createLong, payload);

    alert('등록되었습니다.');

    yield put(createLongSuccess());

    return data;
}

export function* watchCreateLong() {
    yield takeEvery(
        CreateLongActionTypes.REQUEST,
        commonMiddleware(createLongSaga),
    );
}