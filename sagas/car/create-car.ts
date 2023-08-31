import type { CreateCarRequestAction } from '@actions/car/create-car.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateCarActionTypes,
    createCarSuccess,
} from '@actions/car/create-car.action';

function* createCarSaga({ payload }: CreateCarRequestAction) {
    const { data } = yield call(carsService.createCar, payload);

    const { Message } = data;

    if (Message === 'Success') {
        alert('등록되었습니다.');
    } else {
        alert(Message);
    }

    yield put(createCarSuccess());

    return data;
}

export function* watchCreateCar() {
    yield takeEvery(
        CreateCarActionTypes.REQUEST,
        commonMiddleware(createCarSaga),
    );
}
