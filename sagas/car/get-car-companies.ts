import type { GetCarCompaniesRequestAction } from '@actions/contract/car/get-car-companies.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import carsService from '@services/carsService';
import {
    GetCarCompaniesActionTypes,
    getCarCompaniesSuccess,
} from '@actions/contract/car/get-car-companies.action';
import { commonMiddleware } from '@utils/generators/common';

function* getCarCompaniesSaga({ payload }: GetCarCompaniesRequestAction) {
    const { data } = yield call(carsService.getCarCompanies, payload);

    yield put(getCarCompaniesSuccess({ type: payload.type, data }));

    return data;
}

export function* watchGetCarCompanies() {
    yield takeEvery(
        GetCarCompaniesActionTypes.REQUEST,
        commonMiddleware(getCarCompaniesSaga),
    );
}
