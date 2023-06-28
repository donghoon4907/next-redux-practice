import type { UploadImageRequestAction } from '@actions/upload/image.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import uploadService from '@services/uploadService';
import { sagaError } from '@actions/error/error.action';
import {
    UploadImageActionTypes,
    uploadImageSuccess,
} from '@actions/upload/image.action';

function* uploadImageSaga({ payload }: UploadImageRequestAction) {
    try {
        const { data } = yield call(uploadService.uploadImage, payload);

        payload.callback?.(data);
    } catch (e: any) {
        const { data, status } = e.response;

        yield put(uploadImageSuccess(data));

        if (status === 403) {
            yield put(sagaError({ message: data, statusCode: status }));

            alert(data);
        }
    }
}

export function* watchUploadImage() {
    yield takeEvery(UploadImageActionTypes.REQUEST, uploadImageSaga);
}
