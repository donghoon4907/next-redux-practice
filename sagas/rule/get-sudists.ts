import type { GetSudistsRequestAction } from '@actions/rule/get-sudists';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetSudistsActionTypes,
    getSudistsSuccess,
} from '@actions/rule/get-sudists';

function* getSudistsSaga({ payload }: GetSudistsRequestAction) {
    const { data } = yield call(rulesService.getSudists, payload);

    const rates = data.map((v: any) => ({
        label: v,
        value: v,
    }));

    yield put(getSudistsSuccess(rates));

    return rates;
}

export function* watchGetSudists() {
    yield takeEvery(
        GetSudistsActionTypes.REQUEST,
        commonMiddleware(getSudistsSaga),
    );
}
