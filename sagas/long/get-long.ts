import type { GetLongRequestAction } from '@actions/long/get-long.action';
import { call, takeEvery } from 'redux-saga/effects';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import longsService from '@services/longsService';
import { GetLongActionTypes } from '@actions/long/get-long.action';

function* getLongSaga({ payload }: GetLongRequestAction) {
    const { data } = yield call(longsService.getLong, payload);

    return data;
}

export function* watchGetLong() {
    yield takeEvery(
        GetLongActionTypes.REQUEST,
        convertDateMiddleware(getLongSaga),
    );
}
