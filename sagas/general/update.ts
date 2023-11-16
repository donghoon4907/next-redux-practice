import type { UpdateGeneralRequestAction } from '@actions/contract/general/update.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import generalsService from '@services/generalsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateGeneralActionTypes,
    updateGeneralSuccess,
} from '@actions/contract/general/update.action';

function* updateGeneralSaga({ payload }: UpdateGeneralRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(generalsService.beforeUpdateGeneral, rest);

    const { message } = data;

    if (message === 'Success') {
        alert('수정되었습니다.');
    } else {
        alert(message);
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
