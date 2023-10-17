import type { GetLongsRequestAction } from '@actions/contract/long/get-longs.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import longsService from '@services/longsService';
import {
    GetLongsActionTypes,
    getLongsSuccess,
} from '@actions/contract/long/get-longs.action';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';

function* getLongsSaga({ payload }: GetLongsRequestAction) {
    const { data } = yield call(longsService.getLongs, payload);

    const successPayload = generateListSuccessPayload(data, payload);
    // 상품 목록
    if (data.hasOwnProperty('data')) {
        const target = data.data;
        if (target.hasOwnProperty('search')) {
            successPayload['products'] = target.search[0][0].row.map(
                (v: any) => ({ label: v.title, value: v.p_code }),
            );
        }
    }

    yield put(getLongsSuccess(successPayload));

    return data;
}

export function* watchGetLongs() {
    yield takeEvery(
        GetLongsActionTypes.REQUEST,
        commonMiddleware(getLongsSaga),
    );
}
