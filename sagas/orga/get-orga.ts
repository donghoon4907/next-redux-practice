import type { GetOrgaRequestAction } from '@actions/orga/get-orga.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import orgasService from '@services/orgasService';
import {
    GetOrgaActionTypes,
    getOrgaSuccess,
} from '@actions/orga/get-orga.action';
import { commonMiddleware } from '@utils/generators/common';

function* getOrgaSaga({ payload }: GetOrgaRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(orgasService.getOrga, rest);

    yield put(getOrgaSuccess(data));

    return data;
}

export function* watchGetOrga() {
    yield takeEvery(GetOrgaActionTypes.REQUEST, commonMiddleware(getOrgaSaga));
}
