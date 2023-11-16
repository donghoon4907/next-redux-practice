import type { GetLongFieldsRequestAction } from '@actions/contract/long/get-fields.action';
import { call, takeEvery } from 'redux-saga/effects';
import { searchMiddleware } from '@utils/generators/search';
import longsService from '@services/longsService';
import { GetLongFieldsActionTypes } from '@actions/contract/long/get-fields.action';

function* getLongFieldsSaga(action: GetLongFieldsRequestAction) {
    const { data } = yield call(longsService.getLongFields);

    return data;
}

export function* watchGetLongFields() {
    yield takeEvery(
        GetLongFieldsActionTypes.REQUEST,
        searchMiddleware(getLongFieldsSaga),
    );
}
