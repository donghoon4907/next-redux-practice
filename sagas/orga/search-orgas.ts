import type { SearchOrgasRequestAction } from '@actions/hr/orga/search-orgas.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import orgasService from '@services/orgasService';
import {
    SearchOrgasActionTypes,
    searchOrgasSuccess,
} from '@actions/hr/orga/search-orgas.action';
import { commonMiddleware } from '@utils/generators/common';
import { generateListSuccessPayload } from '@utils/generate';

function* searchOrgasSaga({ payload }: SearchOrgasRequestAction) {
    const { data } = yield call(orgasService.searchOrgas, payload);

    const successPayload = generateListSuccessPayload(data, payload);

    yield put(searchOrgasSuccess(successPayload));

    return data;
}

export function* watchSearchOrgas() {
    yield takeEvery(
        SearchOrgasActionTypes.REQUEST,
        commonMiddleware(searchOrgasSaga),
    );
}
