import type { GetOrgasRequestAction } from '@actions/orga/get-orgas.action';
import type { Orga } from '@models/orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import orgasService from '@services/orgasService';
import {
    GetOrgasActionTypes,
    getOrgasSuccess,
} from '@actions/orga/get-orgas.action';
import { commonMiddleware } from '@utils/generators/common';

function* getOrgasSaga({ payload }: GetOrgasRequestAction) {
    const { data } = yield call(orgasService.getOrgas, payload);

    const orgas = data.map((v: Orga) => ({
        label: v.orga,
        value: v.idx,
    }));

    yield put(getOrgasSuccess(orgas));

    return data;
}

export function* watchGetOrgas() {
    yield takeEvery(
        GetOrgasActionTypes.REQUEST,
        commonMiddleware(getOrgasSaga),
    );
}
