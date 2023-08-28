import type { UpdateLongRequestAction } from '@actions/long/update-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateLongActionTypes,
    updateLongSuccess,
} from '@actions/long/update-long.action';

function* updateLongSaga({ payload }: UpdateLongRequestAction) {
    const { data } = yield call(longsService.updateLong, payload);

    const { Message } = data;

    if (Message === 'Success') {
        alert('수정되었습니다.');
    } else {
        alert(Message);
    }

    yield put(updateLongSuccess());

    return data;
}

export function* watchUpdateLong() {
    yield takeEvery(
        UpdateLongActionTypes.REQUEST,
        commonMiddleware(updateLongSaga),
    );
}
