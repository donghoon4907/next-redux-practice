import type { GetMakeableRatesRequestAction } from '@actions/rule/get-makeable-rates';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetMakeableRatesActionTypes,
    getMakeableRatesSuccess,
} from '@actions/rule/get-makeable-rates';

function* getMakeableRatesSaga(action: GetMakeableRatesRequestAction) {
    const { data } = yield call(rulesService.getMakeableRates);

    const rates = data.map((v: any) => ({
        label: v.rate_name,
        value: v.rule_rate,
    }));

    yield put(getMakeableRatesSuccess(rates));

    return rates;
}

export function* watchGetMakeableRates() {
    yield takeEvery(
        GetMakeableRatesActionTypes.REQUEST,
        commonMiddleware(getMakeableRatesSaga),
    );
}
