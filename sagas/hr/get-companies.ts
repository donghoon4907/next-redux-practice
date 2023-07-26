import type { GetCompaniesRequestAction } from '@actions/hr/get-companies';
import type { Company } from '@models/company';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetCompaniesActionTypes,
    getCompaniesSuccess,
} from '@actions/hr/get-companies';

function* getCompaniesSaga(action: GetCompaniesRequestAction) {
    const { data } = yield call(hrsService.getCompanies);

    const companies = data.map((v: Company) => ({
        label: v.company,
        value: v.wcode,
        origin: v,
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
