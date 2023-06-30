import type { DemoRequestAction } from '@actions/demo/demo.action';
import { call, takeEvery } from 'redux-saga/effects';
import { DemoActionTypes } from '@actions/demo/demo.action';
import { convertDateMiddleware } from '@utils/generators/convert-date';
import demosService from '@services/demosService';

function* demoSaga({ payload }: DemoRequestAction) {
    const { data } = yield call(demosService.requestDemo, payload);

    return data;
}

export function* watchDemo() {
    yield takeEvery(DemoActionTypes.REQUEST, convertDateMiddleware(demoSaga));
}
