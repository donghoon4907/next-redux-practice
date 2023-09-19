import type { UpdateCarRequestAction } from '@actions/contract/car/update-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateCarActionTypes,
    updateCarSuccess,
} from '@actions/contract/car/update-car.action';

function* updateCarSaga({ payload }: UpdateCarRequestAction) {
    const { data } = yield call(carsService.beforeUpdateCar, payload);

    const { message } = data;

    if (message === 'Success') {
        alert('수정되었습니다.');
    } else {
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
