import {
    type GetBasicPaymentsRequestAction,
    GetBasicPaymentsActionTypes,
} from '@actions/long/get-basic-payments.action';
import { call, takeEvery } from 'redux-saga/effects';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import longsService from '@services/longsService';

function* getBasicPaymentsSaga({ payload }: GetBasicPaymentsRequestAction) {
    const { data } = yield call(longsService.getBasicPayments, payload);

    return data;
}

export function* watchGetBasicPayments() {
    yield takeEvery(
        GetBasicPaymentsActionTypes.REQUEST,
        convertDateMiddleware(getBasicPaymentsSaga),
    );
}
