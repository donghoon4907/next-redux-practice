import type { UploadPortraitRequestAction } from '@actions/upload/portrait.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import uploadService from '@services/uploadService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UploadPortraitActionTypes,
    uploadPortraitSuccess,
} from '@actions/upload/portrait.action';

function* uploadPortraitSaga({ payload }: UploadPortraitRequestAction) {
    const { data } = yield call(uploadService.portraitUpload, payload, {});

    if (data.filename) {
        yield put(uploadPortraitSuccess(data.filename));
    }

    return data;
}

export function* watchUploadPortrait() {
    yield takeEvery(
        UploadPortraitActionTypes.REQUEST,
        commonMiddleware(uploadPortraitSaga),
    );
}
