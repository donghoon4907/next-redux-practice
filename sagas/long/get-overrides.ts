import {
    type GetOverridesRequestAction,
    GetOverridesActionTypes,
} from '@actions/long/get-overrides.action';
import { call, takeEvery } from 'redux-saga/effects';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import longsService from '@services/longsService';

function* getOverridesSaga({ payload }: GetOverridesRequestAction) {
    const { data } = yield call(longsService.getOverrides, payload);

    return data;
}

export function* watchGetOverrides() {
    yield takeEvery(
        GetOverridesActionTypes.REQUEST,
        convertDateMiddleware(getOverridesSaga),
    );
}
