import type { GetLazyOrgasRequestAction } from '@actions/hr/get-lazy-orgas.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    getLazyOrgasSuccess,
    GetLazyOrgasActionTypes,
} from '@actions/hr/get-lazy-orgas.action';
import { Orga } from '@models/orga';

function* getLazyOrgasSaga({ payload }: GetLazyOrgasRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeGetOrgas, rest);

    const orgas = data.map((v: Orga) => ({
        label: v.orga,
        value: v.idx,
    }));

    yield put(getLazyOrgasSuccess(orgas));

    return data;
}

export function* watchGetLazyOrgas() {
    yield takeEvery(
        GetLazyOrgasActionTypes.REQUEST,
        commonMiddleware(getLazyOrgasSaga),
    );
}
