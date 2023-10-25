import type { GetCarsRequestAction } from '@actions/contract/car/get-cars.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetCarsActionTypes,
    getCarsSuccess,
} from '@actions/contract/car/get-cars.action';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';

function* getCarsSaga({ payload }: GetCarsRequestAction) {
    const { data } = yield call(carsService.getCars, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getCarsSuccess(successPayload));

    return data;
}

export function* watchGetCars() {
    yield takeEvery(GetCarsActionTypes.REQUEST, commonMiddleware(getCarsSaga));
}
