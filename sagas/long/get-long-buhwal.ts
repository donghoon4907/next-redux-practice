import type { GetLongBuhwalsRequestAction } from '@actions/contract/long/get-long-buhwals.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import longsService from '@services/longsService';
import { generateListSuccessPayload } from '@utils/generate';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetLongBuhwalsActionTypes,
    getLongBuhwalsSuccess,
} from '@actions/contract/long/get-long-buhwals.action';

function* getLongBuhwalsSaga({ payload }: GetLongBuhwalsRequestAction) {
    const { data } = yield call(longsService.getLongBuhwals, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getLongBuhwalsSuccess(successPayload));

    return data;
}

export function* watchGetLongBuhwals() {
    yield takeEvery(
        GetLongBuhwalsActionTypes.REQUEST,
        commonMiddleware(getLongBuhwalsSaga),
    );
}
