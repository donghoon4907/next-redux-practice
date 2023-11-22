import type { GetCarRequestAction } from '@actions/car/get-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import { GetCarActionTypes, getCarSuccess } from '@actions/car/get-car.action';
import { commonMiddleware } from '@utils/generators/common';

function* getCarSaga({ payload }: GetCarRequestAction) {
    const { data } = yield call(carsService.getCar, payload);

    yield put(getCarSuccess(data));

    return data;
}

export function* watchGetCar() {
    yield takeEvery(GetCarActionTypes.REQUEST, commonMiddleware(getCarSaga));
}
