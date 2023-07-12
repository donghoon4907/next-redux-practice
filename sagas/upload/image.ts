import type { UploadRequestAction } from '@actions/upload/upload.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import uploadService from '@services/uploadService';
import { commonMiddleware } from '@utils/generators/common';
import {
    UploadImageActionTypes,
    uploadImageSuccess,
} from '@actions/upload/image.action';

function* uploadImageSaga({ payload }: UploadRequestAction) {
    const { data } = yield call(uploadService.upload, payload, {});

    if (data.filename) {
        yield put(uploadImageSuccess(data));
    }

    return data;
}

export function* watchUploadImage() {
    yield takeEvery(
        UploadImageActionTypes.REQUEST,
        commonMiddleware(uploadImageSaga),
    );
}
