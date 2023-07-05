import type { GetLongsRequestAction } from '@actions/long/get-longs.action';
import { call, takeEvery } from 'redux-saga/effects';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import longsService from '@services/longsService';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';

function* getLongsSaga({ payload }: GetLongsRequestAction) {
    const { data } = yield call(longsService.getLongs, payload);

    return data;
}

export function* watchGetLongs() {
    yield takeEvery(
        GetLongsActionTypes.REQUEST,
        convertDateMiddleware(getLongsSaga),
    );
}
