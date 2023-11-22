import type { UploadLongRequestAction } from '@actions/long/upload.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UploadLongActionTypes,
    uploadLongSuccess,
} from '@actions/long/upload.action';

function* uploadLongSaga({ payload }: UploadLongRequestAction) {
    const { data } = yield call(longsService.uploadLong, payload);

    const { Message } = data;

    alert(Message);

    yield put(uploadLongSuccess());

    return data;
}

export function* watchUploadLong() {
    yield takeEvery(
        UploadLongActionTypes.REQUEST,
        commonMiddleware(uploadLongSaga),
    );
}
