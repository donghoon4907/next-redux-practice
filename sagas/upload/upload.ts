import type {
    UploadPreparePayload,
    UploadRequestAction,
} from '@actions/upload/upload.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import uploadService from '@services/uploadService';
import {
    UploadActionTypes,
    uploadPrepare,
    uploadProgress,
    uploadSuccess,
} from '@actions/upload/upload.action';
import { commonMiddleware } from '@utils/generators/common';

function* uploadSaga({ payload }: UploadRequestAction) {
    // 업로드 작업 전 미리 업로드될 파일 목록을 생성
    const files: UploadPreparePayload = [];
    let lastIndex = payload.lastIndex;
    for (const [key, file] of payload.formData.entries()) {
        if (key === 'file') {
            files.push({
                index: lastIndex,
                // origin: (file as File).name,
                progress: 0,
                file: file as File,
            });

            lastIndex++;
        }
    }

    yield put(uploadPrepare(files));
    // 파일 목록을 순서대로 하나씩 업로드
    for (let i = 0; i < files.length; i++) {
        const formData = new FormData();

        formData.append('file', files[i].file);

        const { data } = yield call(
            uploadService.upload,
            { category: payload.category, formData },
            {
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100,
                    );

                    put(uploadProgress(progress));
                },
            },
        );

        if (data.filename) {
            yield put(uploadSuccess({ ...data, index: payload.lastIndex + i }));
        }
    }

    return null;
}

export function* watchUpload() {
    yield takeEvery(UploadActionTypes.REQUEST, commonMiddleware(uploadSaga));
}
