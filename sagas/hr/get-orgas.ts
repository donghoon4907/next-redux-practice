import type { GetOrgasRequestAction } from '@actions/hr/get-orgas';
import type { Orga } from '@models/orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { GetOrgasActionTypes, getOrgasSuccess } from '@actions/hr/get-orgas';
import { commonMiddleware } from '@utils/generators/common';

function* getOrgasSaga({ payload }: GetOrgasRequestAction) {
    const { data } = yield call(hrsService.getOrgas, payload);

    const orgas = data.map((v: Orga) => ({
        label: v.fulls,
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
