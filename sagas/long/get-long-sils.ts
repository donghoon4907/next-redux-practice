import type { GetLongSilsRequestAction } from '@actions/contract/long/get-long-sils.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import longsService from '@services/longsService';

import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetLongSilsActionTypes,
    getLongSilsSuccess,
} from '@actions/contract/long/get-long-sils.action';

function* getLongSilsSaga({ payload }: GetLongSilsRequestAction) {
    const { data } = yield call(longsService.getLongSils, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getLongSilsSuccess(successPayload));

    return data;
}

export function* watchGetLongSils() {
    yield takeEvery(
        GetLongSilsActionTypes.REQUEST,
        commonMiddleware(getLongSilsSaga),
    );
}
