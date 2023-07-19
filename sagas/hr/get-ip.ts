import type { GetIpRequestAction } from '@actions/hr/get-ip.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
// import { sagaError } from '@actions/error/error.action';
import { commonMiddleware } from '@utils/generators/common';
import { GetIpActionTypes, getIpSuccess } from '@actions/hr/get-ip.action';

function* getIpSaga({ payload }: GetIpRequestAction) {
    const { data } = yield call(hrsService.getIp, payload);

    if (data.ip) {
        yield put(getIpSuccess(data));
    }

    return data;
}

export function* watchGetIp() {
    yield takeEvery(GetIpActionTypes.REQUEST, commonMiddleware(getIpSaga));
}
