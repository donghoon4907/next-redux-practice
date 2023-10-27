import type { GetOrgaRequestAction } from '@actions/hr/get-orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    GetLazySimpleOrgaActionTypes,
    getLazySimpleOrgaSuccess,
} from '@actions/hr/get-lazy-simple-orga';
import { commonMiddleware } from '@utils/generators/common';

function* getLazySimpleOrgaSaga({ payload }: GetOrgaRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeGetSimpleOrga, rest);

    yield put(getLazySimpleOrgaSuccess(data));

    return data;
}

export function* watchGetLazySimpleOrga() {
    yield takeEvery(
        GetLazySimpleOrgaActionTypes.REQUEST,
        commonMiddleware(getLazySimpleOrgaSaga),
    );
}
