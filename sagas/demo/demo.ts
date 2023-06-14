import type { DemoRequestAction } from '@actions/demo/demo.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DemoActionTypes } from '@actions/demo/demo.action';
import { requestDemo } from '@services/demosService';
import { demoSuccess } from '@actions/demo/demo.action';
import { sagaError } from '@actions/error/error.action';
import { convertDateMiddleware } from '@utils/generators/convert-date';

function* demoSaga({ payload }: DemoRequestAction) {
    const { data } = yield call(requestDemo, payload);

    return data;
}

export function* watchDemo() {
    yield takeEvery(DemoActionTypes.REQUEST, convertDateMiddleware(demoSaga));
}
