import {
    type GetBasicPaymentsRequestAction,
    GetBasicPaymentsActionTypes,
} from '@actions/long/get-basic-payments.action';
import { call, takeEvery } from 'redux-saga/effects';
import { searchMiddleware } from '@utils/generators/search';
import demosService from '@services/demosService';

function* getBasicPaymentsSaga({ payload }: GetBasicPaymentsRequestAction) {
    const { data } = yield call(demosService.getBasicPayments, payload);

    return data;
}

export function* watchGetBasicPayments() {
    yield takeEvery(
        GetBasicPaymentsActionTypes.REQUEST,
        searchMiddleware(getBasicPaymentsSaga),
    );
}
