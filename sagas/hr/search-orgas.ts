import type { SearchOrgasRequestAction } from '@actions/hr/search-orgas.action';
import { call, takeEvery } from 'redux-saga/effects';
import { searchMiddleware } from '@utils/generators/search';
import hrsService from '@services/hrsService';
import { SearchOrgasActionTypes } from '@actions/hr/search-orgas.action';

function* searchOrgasSaga({ payload }: SearchOrgasRequestAction) {
    const { data } = yield call(hrsService.searchOrgas, payload);

    return data;
}

export function* watchSearchOrgas() {
    yield takeEvery(
        SearchOrgasActionTypes.REQUEST,
        searchMiddleware(searchOrgasSaga),
    );
}
