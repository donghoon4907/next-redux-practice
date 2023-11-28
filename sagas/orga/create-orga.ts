import type { CreateOrgaRequestAction } from '@actions/orga/create-orga.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import orgasService from '@services/orgasService';
import {
    CreateOrgaActionTypes,
    createOrgaSuccess,
} from '@actions/orga/create-orga.action';
import { commonMiddleware } from '@utils/generators/common';

function* createOrgaSaga({ payload }: CreateOrgaRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(orgasService.createOrga, rest);

    const { idx, Message } = data;

    if (!idx) {
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
