import type { GetUserCustomersRequestAction } from '@actions/customer/get-user-customers';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetUserCustomersActionTypes,
    getUserCustomersSuccess,
} from '@actions/customer/get-user-customers';

function* getUserCustomersSaga({ payload }: GetUserCustomersRequestAction) {
    const { data } = yield call(customersService.getUserCustomers, payload);

    yield put(getUserCustomersSuccess(data));

    return data;
}

export function* watchGetUserCustomers() {
    yield takeEvery(
        GetUserCustomersActionTypes.REQUEST,
        commonMiddleware(getUserCustomersSaga),
    );
}
