import type { GetCompaniesRequestAction } from '@actions/hr/common/get-companies.action';
import type { Company } from '@models/company';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetCompaniesActionTypes,
    getCompaniesSuccess,
} from '@actions/hr/common/get-companies.action';

function* getCompaniesSaga(action: GetCompaniesRequestAction) {
    const { data } = yield call(hrsService.getCompanies, action.payload);

    const companies = data.map((v: Company) => ({
        label: v.name,
        value: v.wcode,
        origin: v,
    }));

    yield put(
        getCompaniesSuccess({
            type: action.payload,
            companies,
        }),
    );

    return data;
}

export function* watchGetCompanies() {
    yield takeEvery(
        GetCompaniesActionTypes.REQUEST,
        commonMiddleware(getCompaniesSaga),
    );
}
