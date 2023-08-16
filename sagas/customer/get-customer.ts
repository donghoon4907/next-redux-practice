import type { GetCustomerRequestAction } from '@actions/customer/get-customer';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    getCustomerSuccess,
    GetCustomerActionTypes,
} from '@actions/customer/get-customer';

function* getCustomerSaga({ payload }: GetCustomerRequestAction) {
    const { data } = yield call(customersService.getCustomer, payload);

    yield put(getCustomerSuccess(data));

    return data;
}

export function* watchGetCustomer() {
    yield takeEvery(
        GetCustomerActionTypes.REQUEST,
        commonMiddleware(getCustomerSaga),
    );
}
