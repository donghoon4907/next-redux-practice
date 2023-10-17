import type { SearchOrgasRequestAction } from '@actions/hr/search-orgas.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import {
    SearchOrgasActionTypes,
    searchOrgasSuccess,
} from '@actions/hr/search-orgas.action';
import { commonMiddleware } from '@utils/generators/common';
import { generateListSuccessPayload } from '@utils/generate';

function* searchOrgasSaga({ payload }: SearchOrgasRequestAction) {
    const { data } = yield call(hrsService.searchOrgas, payload);

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
