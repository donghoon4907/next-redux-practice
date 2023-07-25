import type { GetAgenciesRequestAction } from '@actions/hr/get-agencys';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetAgenciesActionTypes,
    getAgenciesSuccess,
} from '@actions/hr/get-agencys';

function* getAgenciesSaga(action: GetAgenciesRequestAction) {
    const { data } = yield call(hrsService.getAgencies);

    const agencies = Object.entries(data as Record<string, string>).map(
        ([name, code]) => ({
            label: name,
            value: code,
        }),
    );

    yield put(getAgenciesSuccess(agencies));

    return data;
}

export function* watchGetAgencies() {
    yield takeEvery(
        GetAgenciesActionTypes.REQUEST,
        commonMiddleware(getAgenciesSaga),
    );
}
