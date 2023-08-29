import type { UpdateGeneralRequestAction } from '@actions/general/update-general.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import generalsService from '@services/generalsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateGeneralActionTypes,
    updateGeneralSuccess,
} from '@actions/general/update-general.action';

function* updateGeneralSaga({ payload }: UpdateGeneralRequestAction) {
    const { data } = yield call(generalsService.updateGeneral, payload);

    const { Message } = data;

    if (Message === 'Success') {
        alert('수정되었습니다.');
    } else {
        alert(Message);
    }

    yield put(updateGeneralSuccess());

    return data;
}

export function* watchUpdateGeneral() {
    yield takeEvery(
        UpdateGeneralActionTypes.REQUEST,
        commonMiddleware(updateGeneralSaga),
    );
}
