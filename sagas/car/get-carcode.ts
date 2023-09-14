import type { GetCarcodeRequestAction } from '@actions/contract/car/get-carcode.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetCarcodeActionTypes,
    getCarcodeSuccess,
} from '@actions/contract/car/get-carcode.action';
import { commonMiddleware } from '@utils/generators/common';

function* getCarcodeSaga({ payload }: GetCarcodeRequestAction) {
    const { data } = yield call(carsService.getCarcode, payload);

    yield put(
        getCarcodeSuccess({
            type: payload.type,
            idate: payload.idate,
            data,
        }),
    );

    return data;
}

export function* watchGetCarcode() {
    yield takeEvery(
        GetCarcodeActionTypes.REQUEST,
        commonMiddleware(getCarcodeSaga),
    );
}
