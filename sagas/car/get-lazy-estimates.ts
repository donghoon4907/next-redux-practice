import type { GetLazyEstimatesRequestAction } from '@actions/contract/car/get-lazy-estimates.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetLazyEstimatesActionTypes,
    getLazyEstimatesSuccess,
} from '@actions/contract/car/get-lazy-estimates.action';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';

function* getLazyEstimatesSaga({ payload }: GetLazyEstimatesRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.beforeGetEstimates, rest);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getLazyEstimatesSuccess(successPayload));

    return data;
}

export function* watchGetLazyEstimates() {
    yield takeEvery(
        GetLazyEstimatesActionTypes.REQUEST,
        commonMiddleware(getLazyEstimatesSaga),
    );
}
