import type { CreateCustomerRequestAction } from '@actions/customer/create-customer.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateCustomerActionTypes,
    createCustomerSuccess,
} from '@actions/customer/create-customer.action';

function* createCustomerSaga({ payload }: CreateCustomerRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(customersService.beforeCreateCustomer, rest);

    alert('등록되었습니다.');

    yield put(createCustomerSuccess());

    return data;
}

export function* watchCreateCustomer() {
    yield takeEvery(
        CreateCustomerActionTypes.REQUEST,
        commonMiddleware(createCustomerSaga),
    );
}
