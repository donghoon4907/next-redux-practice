import type { GetHwansRequestAction } from '@actions/rule/get-hwans';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import { GetHwansActionTypes, getHwansSuccess } from '@actions/rule/get-hwans';

function* getHwansSaga(action: GetHwansRequestAction) {
    const { data } = yield call(rulesService.getHwans);

    const rates = data.map((v: any) => ({
        label: v.hwan_name,
        value: v.idx,
    }));

    yield put(getHwansSuccess(rates));

    return rates;
}

export function* watchGetHwans() {
    yield takeEvery(
        GetHwansActionTypes.REQUEST,
        commonMiddleware(getHwansSaga),
    );
}
