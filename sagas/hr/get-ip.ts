import type { GetIpRequestAction } from '@actions/hr/get-ip.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import externalsService from '@services/externalsService';
import { commonMiddleware } from '@utils/generators/common';
import { GetIpActionTypes, getIpSuccess } from '@actions/hr/get-ip.action';

function* getIpSaga({ payload }: GetIpRequestAction) {
    const { data } = yield call(externalsService.getIp, payload);

    if (data.ip) {
        yield put(getIpSuccess(data));
    }

    return data;
}

export function* watchGetIp() {
    yield takeEvery(GetIpActionTypes.REQUEST, commonMiddleware(getIpSaga));
}
