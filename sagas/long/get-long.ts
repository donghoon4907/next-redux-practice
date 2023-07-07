import type { GetLongRequestAction } from '@actions/long/get-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import {
    GetLongActionTypes,
    getLongSuccess,
} from '@actions/long/get-long.action';
import { commonMiddleware } from '@utils/generators/common';

function* getLongSaga({ payload }: GetLongRequestAction) {
    const { data } = yield call(longsService.getLong, payload);

    yield put(getLongSuccess(data));

    return data;
}

export function* watchGetLong() {
    yield takeEvery(GetLongActionTypes.REQUEST, commonMiddleware(getLongSaga));
}
