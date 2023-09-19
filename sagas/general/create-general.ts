import type { CreateGeneralRequestAction } from '@actions/contract/general/create-general.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import generalsService from '@services/generalsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateGeneralActionTypes,
    createGeneralSuccess,
} from '@actions/contract/general/create-general.action';

function* createGeneralSaga({ payload }: CreateGeneralRequestAction) {
    const { data } = yield call(generalsService.beforeCreateGeneral, payload);

    const { message } = data;

    if (message === 'Success') {
        alert('등록되었습니다.');
    } else {
        alert(message);
    }

    yield put(createGeneralSuccess());

    return data;
}

export function* watchCreateGeneral() {
    yield takeEvery(
        CreateGeneralActionTypes.REQUEST,
        commonMiddleware(createGeneralSaga),
    );
}
