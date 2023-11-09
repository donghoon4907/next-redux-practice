import type { GetLazyEstimateRequestAction } from '@actions/contract/car/get-lazy-estimate.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetLazyEstimateActionTypes,
    getLazyEstimateSuccess,
} from '@actions/contract/car/get-lazy-estimate.action';
import { commonMiddleware } from '@utils/generators/common';

function* getLazyEstimateSaga({ payload }: GetLazyEstimateRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.beforeGetEstimate, rest);

    yield put(getLazyEstimateSuccess(data));

    return data;
}

export function* watchGetLazyEstimate() {
    yield takeEvery(
        GetLazyEstimateActionTypes.REQUEST,
        commonMiddleware(getLazyEstimateSaga),
    );
}
