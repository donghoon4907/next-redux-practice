import type { GetRuleOrgasRequestAction } from '@actions/rule/get-orgas';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetRuleOrgasActionTypes,
    getRuleOrgasSuccess,
} from '@actions/rule/get-orgas';

function* getRuleOrgasSaga({ payload }: GetRuleOrgasRequestAction) {
    const { data } = yield call(rulesService.getRuleOrgas, payload);

    const orgas = data.map((v: any) => ({
        label: v.orga,
        value: v.idx,
    }));

    yield put(getRuleOrgasSuccess(orgas));

    return orgas;
}

export function* watchGetRuleOrgas() {
    yield takeEvery(
        GetRuleOrgasActionTypes.REQUEST,
        commonMiddleware(getRuleOrgasSaga),
    );
}
