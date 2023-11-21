import type { GetCompanyRegNumRequestAction } from '@actions/hr/common/get-company-regnum.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetCompanyRegNumActionTypes,
    getCompanyRegNumSuccess,
} from '@actions/hr/common/get-company-regnum.action';

function* getCompanyRegNumSaga(action: GetCompanyRegNumRequestAction) {
    const { data } = yield call(hrsService.getCompanyRegNum, action.payload);

    yield put(getCompanyRegNumSuccess());

    return data;
}

export function* watchGetCompanyRegNum() {
    yield takeEvery(
        GetCompanyRegNumActionTypes.REQUEST,
        commonMiddleware(getCompanyRegNumSaga),
    );
}
