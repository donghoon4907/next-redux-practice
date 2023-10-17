import type { SearchUsersRequestAction } from '@actions/hr/search-users.action';
import { call, takeEvery, put } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    SearchUsersActionTypes,
    searchUsersSuccess,
} from '@actions/hr/search-users.action';
import { commonMiddleware } from '@utils/generators/common';
import { generateListSuccessPayload } from '@utils/generate';

function* searchUsersSaga({ payload }: SearchUsersRequestAction) {
    const { data } = yield call(hrsService.searchUsers, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(searchUsersSuccess(successPayload));

    return data;
}

export function* watchSearchUsers() {
    yield takeEvery(
        SearchUsersActionTypes.REQUEST,
        commonMiddleware(searchUsersSaga),
    );
}
