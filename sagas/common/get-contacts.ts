import type { GetContactsRequestAction } from '@actions/common/get-contacts.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import commonsService from '@services/commonsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetContactsActionTypes,
    getContactsSuccess,
} from '@actions/common/get-contacts.action';
import { generateListSuccessPayload } from '@utils/generate';

function* getContactsSaga({ payload }: GetContactsRequestAction) {
    const { data } = yield call(commonsService.getContacts, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(getContactsSuccess(successPayload));

    return data;
}

export function* watchGetContacts() {
    yield takeEvery(
        GetContactsActionTypes.REQUEST,
        commonMiddleware(getContactsSaga),
    );
}
