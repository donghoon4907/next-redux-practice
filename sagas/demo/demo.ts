import type { DemoRequestAction } from '@actions/demo/demo.action';
import { call, takeEvery } from 'redux-saga/effects';
import { DemoActionTypes } from '@actions/demo/demo.action';
import { searchMiddleware } from '@utils/generators/search';
import demosService from '@services/demosService';

function* demoSaga({ payload }: DemoRequestAction) {
    const { data } = yield call(demosService.requestDemo, payload);

    return data;
}

export function* watchDemo() {
    yield takeEvery(DemoActionTypes.REQUEST, searchMiddleware(demoSaga));
}
