import type { UpdateLongRequestAction } from '@actions/contract/long/update-long.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UpdateLongActionTypes,
    updateLongSuccess,
} from '@actions/contract/long/update-long.action';

function* updateLongSaga({ payload }: UpdateLongRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(longsService.beforeUpdateLong, rest);

    const { message } = data;

    if (message !== 'Success') {
        alert(message);
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
