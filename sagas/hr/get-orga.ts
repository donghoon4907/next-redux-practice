import type { GetOrgaRequestAction } from '@actions/hr/get-orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { GetOrgaActionTypes, getOrgaSuccess } from '@actions/hr/get-orga';
import { commonMiddleware } from '@utils/generators/common';

function* getOrgaSaga({ payload }: GetOrgaRequestAction) {
    const { data } = yield call(hrsService.beforeGetOrga, payload);

    yield put(getOrgaSuccess(data));

    return data;
}

export function* watchGetOrga() {
    yield takeEvery(GetOrgaActionTypes.REQUEST, commonMiddleware(getOrgaSaga));
}
