import type { SearchUsersRequestAction } from '@actions/hr/search-users.action';
import { call, takeEvery } from 'redux-saga/effects';
import { searchMiddleware } from '@utils/generators/search';
import hrsService from '@services/hrsService';
import { SearchUsersActionTypes } from '@actions/hr/search-users.action';

function* searchUsersSaga({ payload }: SearchUsersRequestAction) {
    const { data } = yield call(hrsService.searchUsers, payload);

    return data;
}

export function* watchSearchUsers() {
    yield takeEvery(
        SearchUsersActionTypes.REQUEST,
        searchMiddleware(searchUsersSaga),
    );
}
