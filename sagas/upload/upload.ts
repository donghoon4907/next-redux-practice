import type { UploadRequestAction } from '@actions/upload/upload.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import uploadService from '@services/uploadService';
import {
    UploadActionTypes,
    uploadSuccess,
} from '@actions/upload/upload.action';
import { commonMiddleware } from '@utils/generators/common';

function* uploadSaga({ payload }: UploadRequestAction) {
    const { data } = yield call(uploadService.upload, payload);

    yield put(uploadSuccess(data));

    return data;
}

export function* watchUpload() {
    yield takeEvery(UploadActionTypes.REQUEST, commonMiddleware(uploadSaga));
}
