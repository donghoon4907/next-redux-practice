import type { GetGradesRequestAction } from '@actions/rule/get-grades';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetGradesActionTypes,
    getGradesSuccess,
} from '@actions/rule/get-grades';

function* getGradesSaga(action: GetGradesRequestAction) {
    const { data } = yield call(rulesService.getGrades);

    const rates = data.map((v: any) => ({
        label: v,
        value: v,
    }));

    yield put(getGradesSuccess(rates));

    return rates;
}

export function* watchGetGrades() {
    yield takeEvery(
        GetGradesActionTypes.REQUEST,
        commonMiddleware(getGradesSaga),
    );
}
