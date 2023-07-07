import type { Fc } from '@models/fc';
import type { GetFcsRequestAction } from '@actions/hr/get-fcs';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import { GetFcsActionTypes, getFcsSuccess } from '@actions/hr/get-fcs';

function* getFcsSaga({ payload }: GetFcsRequestAction) {
    const { data } = yield call(hrsService.getFcs, payload);

    const fcs = data.map((v: Fc) => ({
        label: v.name,
        value: v.userid,
    }));

    yield put(getFcsSuccess(fcs));

    return data;
}

export function* watchGetFcs() {
    yield takeEvery(GetFcsActionTypes.REQUEST, commonMiddleware(getFcsSaga));
}
