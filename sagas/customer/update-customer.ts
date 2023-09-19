import type { UpdateCustomerRequestAction } from '@actions/customer/update-customer.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateCustomerActionTypes,
    updateCustomerSuccess,
} from '@actions/customer/update-customer.action';

function* updateCustomerSaga({ payload }: UpdateCustomerRequestAction) {
    const { data } = yield call(customersService.beforeUpdateCustomer, payload);

    const { message } = data;

    if (message === 'Success') {
        alert('수정되었습니다.');
    } else {
        alert(message);
    }

    yield put(updateCustomerSuccess());

    return data;
}

export function* watchUpdateCustomer() {
    yield takeEvery(
        UpdateCustomerActionTypes.REQUEST,
        commonMiddleware(updateCustomerSaga),
    );
}
