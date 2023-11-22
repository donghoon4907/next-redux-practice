import type { GetCarcodeRequestAction } from '@actions/car/get-carcode.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetCarcodeActionTypes,
    getCarcodeSuccess,
} from '@actions/car/get-carcode.action';
import { commonMiddleware } from '@utils/generators/common';

function* getCarcodeSaga({ payload }: GetCarcodeRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(carsService.beforeGetCarcode, rest);

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
