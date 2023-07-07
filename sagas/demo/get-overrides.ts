import {
    type GetOverridesRequestAction,
    GetOverridesActionTypes,
} from '@actions/long/get-overrides.action';
import { call, takeEvery } from 'redux-saga/effects';
import { searchMiddleware } from '@utils/generators/search';
import demosService from '@services/demosService';

function* getOverridesSaga({ payload }: GetOverridesRequestAction) {
    const { data } = yield call(demosService.getOverrides, payload);

    return data;
}

export function* watchGetOverrides() {
    yield takeEvery(
        GetOverridesActionTypes.REQUEST,
        searchMiddleware(getOverridesSaga),
    );
}
