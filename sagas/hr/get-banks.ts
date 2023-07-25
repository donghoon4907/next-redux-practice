import type { GetBanksRequestAction } from '@actions/hr/get-banks';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import { getBanksSuccess, GetBanksActionTypes } from '@actions/hr/get-banks';

function* getBanksSaga(action: GetBanksRequestAction) {
    const { data } = yield call(hrsService.getBanks);

    const banks = Object.entries(data as Record<string, string>).map(
        ([name, code]) => ({
            label: name,
            value: code,
        }),
    );

    yield put(getBanksSuccess(banks));

    return data;
}

export function* watchGetBanks() {
    yield takeEvery(
        GetBanksActionTypes.REQUEST,
        commonMiddleware(getBanksSaga),
    );
}
