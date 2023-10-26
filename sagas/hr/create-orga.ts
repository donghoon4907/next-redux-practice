import type { CreateOrgaRequestAction } from '@actions/hr/create-orga.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    CreateOrgaActionTypes,
    createOrgaSuccess,
} from '@actions/hr/create-orga.action';
import { commonMiddleware } from '@utils/generators/common';

function* createOrgaSaga({ payload }: CreateOrgaRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(hrsService.beforeCreateOrga, rest);

    const { orgaid, Message } = data;

    if (!orgaid) {
        alert(Message);
    }

    yield put(createOrgaSuccess());

    return data;
}

export function* watchCreateOrga() {
    yield takeEvery(
        CreateOrgaActionTypes.REQUEST,
        commonMiddleware(createOrgaSaga),
    );
}
