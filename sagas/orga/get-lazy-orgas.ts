import type { GetLazyOrgasRequestAction } from '@actions/hr/orga/get-lazy-orgas.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import orgasService from '@services/orgasService';
import { commonMiddleware } from '@utils/generators/common';
import {
    getLazyOrgasSuccess,
    GetLazyOrgasActionTypes,
} from '@actions/hr/orga/get-lazy-orgas.action';
import { Orga } from '@models/orga';

function* getLazyOrgasSaga({ payload }: GetLazyOrgasRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(orgasService.beforeGetOrgas, rest);

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
