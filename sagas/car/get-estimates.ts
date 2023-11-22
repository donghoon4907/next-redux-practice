import type { GetEstimatesRequestAction } from '@actions/car/get-estimates.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetEstimatesActionTypes,
    getEstimatesSuccess,
} from '@actions/car/get-estimates.action';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';

function* getEstimatesSaga({ payload }: GetEstimatesRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.getEstimates, rest);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getEstimatesSuccess(successPayload));

    return data;
}

export function* watchGetEstimates() {
    yield takeEvery(
        GetEstimatesActionTypes.REQUEST,
        commonMiddleware(getEstimatesSaga),
    );
}
