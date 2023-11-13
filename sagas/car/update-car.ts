import type { UpdateCarRequestAction } from '@actions/contract/car/update-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateCarActionTypes,
    updateCarSuccess,
} from '@actions/contract/car/update-car.action';

function* updateCarSaga({ payload }: UpdateCarRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.beforeUpdateCar, rest);

    const { message } = data;

    if (message !== 'Success') {
        alert(message);
    }

    yield put(updateCarSuccess());

    return data;
}

export function* watchUpdateCar() {
    yield takeEvery(
        UpdateCarActionTypes.REQUEST,
        commonMiddleware(updateCarSaga),
    );
}
