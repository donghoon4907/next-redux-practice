import type { CreateLongRequestAction } from '@actions/contract/long/create-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateLongActionTypes,
    createLongSuccess,
} from '@actions/contract/long/create-long.action';

function* createLongSaga({ payload }: CreateLongRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(longsService.beforeCreateLong, rest);

    const { Message } = data;

    if (!data.data) {
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
