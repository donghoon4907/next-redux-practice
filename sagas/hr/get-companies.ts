import type { GetCompaniesRequestAction } from '@actions/hr/get-companies';
import type { Orga } from '@models/orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetCompaniesActionTypes,
    getCompaniesSuccess,
} from '@actions/hr/get-companies';

function* getCompaniesSaga({ payload }: GetCompaniesRequestAction) {
    const { data } = yield call(hrsService.getCompanies, payload);

    const companies = data.map((v: Orga) => ({
        label: v.fulls,
        value: v.idx,
    }));

    yield put(getCompaniesSuccess(companies));

    return data;
}

export function* watchGetCompanies() {
    yield takeEvery(
        GetCompaniesActionTypes.REQUEST,
        commonMiddleware(getCompaniesSaga),
    );
}
