import type { GetGeneralRequestAction } from '@actions/general/get-general.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import generalsService from '@services/generalsService';
import {
    GetGeneralActionTypes,
    getGeneralSuccess,
} from '@actions/general/get-general.action';
import { commonMiddleware } from '@utils/generators/common';

function* getGeneralSaga({ payload }: GetGeneralRequestAction) {
    const { data } = yield call(generalsService.getGeneral, payload);

    yield put(getGeneralSuccess(data));

    return data;
}

export function* watchGetGeneral() {
    yield takeEvery(
        GetGeneralActionTypes.REQUEST,
        commonMiddleware(getGeneralSaga),
    );
}
