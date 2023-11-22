import type { GetLongsRequestAction } from '@actions/long/get-longs.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import longsService from '@services/longsService';
import {
    GetLongsActionTypes,
    getLongsSuccess,
} from '@actions/long/get-longs.action';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';

function* getLongsSaga({ payload }: GetLongsRequestAction) {
    const { data } = yield call(longsService.getLongs, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getLongsSuccess(successPayload));

    return data;
}

export function* watchGetLongs() {
    yield takeEvery(
        GetLongsActionTypes.REQUEST,
        commonMiddleware(getLongsSaga),
    );
}
