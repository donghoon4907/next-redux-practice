import type { GetLongSilhyosRequestAction } from '@actions/contract/long/get-long-silhyos.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetLongSilhyosActionTypes,
    getLongSilhyosSuccess,
} from '@actions/contract/long/get-long-silhyos.action';

function* getLongSilhyosSaga({ payload }: GetLongSilhyosRequestAction) {
    const { data } = yield call(longsService.getLongSilhyos, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getLongSilhyosSuccess(successPayload));

    return data;
}

export function* watchGetLongSilhyos() {
    yield takeEvery(
        GetLongSilhyosActionTypes.REQUEST,
        commonMiddleware(getLongSilhyosSaga),
    );
}
