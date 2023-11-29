import type { CalculateCarRequestAction } from '@actions/car/calculate-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import externalsService from '@services/externalsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CalculateCarActionTypes,
    calculateCarSuccess,
} from '@actions/car/calculate-car.action';

function* calculateCarSaga({ payload }: CalculateCarRequestAction) {
    const formData = new FormData();

    for (const [key, value] of Object.entries(payload)) {
        formData.append(key, value);
    }

    const { data } = yield call(externalsService.calculate, formData);

    yield put(calculateCarSuccess());

    return data;
}

export function* watchCalculateCar() {
    yield takeEvery(
        CalculateCarActionTypes.REQUEST,
        commonMiddleware(calculateCarSaga),
    );
}
