import type { CreateGeneralRequestAction } from '@actions/general/create-general.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import generalsService from '@services/generalsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateGeneralActionTypes,
    createGeneralSuccess,
} from '@actions/general/create-general.action';

function* createGeneralSaga({ payload }: CreateGeneralRequestAction) {
    const { data } = yield call(generalsService.createGeneral, payload);

    const { Message } = data;

    if (Message === 'Success') {
        alert('등록되었습니다.');
    } else {
        alert(Message);
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