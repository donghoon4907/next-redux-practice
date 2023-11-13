import type { GetEstimateRequestAction } from '@actions/contract/car/get-estimate.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetEstimateActionTypes,
    getEstimateSuccess,
} from '@actions/contract/car/get-estimate.action';
import { commonMiddleware } from '@utils/generators/common';

function* getEstimateSaga({ payload }: GetEstimateRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.getEstimate, rest);

    yield put(getEstimateSuccess({ idx: payload.idx, ...data }));

    return data;
}

export function* watchGetEstimate() {
    yield takeEvery(
        GetEstimateActionTypes.REQUEST,
        commonMiddleware(getEstimateSaga),
    );
}
