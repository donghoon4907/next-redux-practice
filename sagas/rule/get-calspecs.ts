import type { GetCalspecsRequestAction } from '@actions/rule/get-calspecs';
import { call, takeEvery, put } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetCalspecsActionTypes,
    getCalspecsSuccess,
} from '@actions/rule/get-calspecs';

function* getCalspecsSaga({ payload }: GetCalspecsRequestAction) {
    const { data } = yield call(rulesService.getCalspecs, payload);

    const calspecs = data.map((v: any) => ({
        label: v,
        value: v,
    }));

    yield put(getCalspecsSuccess(calspecs));

    return calspecs;
}

export function* watchGetCalspecs() {
    yield takeEvery(
        GetCalspecsActionTypes.REQUEST,
        commonMiddleware(getCalspecsSaga),
    );
}
