import type { DemoRequestAction } from '@actions/demo/demo.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import { DemoActionTypes } from '@actions/demo/demo.action';
import { requestDemo } from '@services/demosService';
import { demoSuccess } from '@actions/demo/demo.action';
import { sagaError } from '@actions/error/error.action';

function* demoSaga({ payload }: DemoRequestAction) {
    try {
        const { data } = yield call(requestDemo, payload);

        yield put(demoSuccess(data));

        payload.callback?.(data);
    } catch (err: any) {
        const { data, status } = err?.response;

        if (status === 403) {
            yield put(sagaError({ message: data, statusCode: status }));
        }
    }
}

export function* watchDemo() {
    yield takeEvery(DemoActionTypes.REQUEST, demoSaga);
}
