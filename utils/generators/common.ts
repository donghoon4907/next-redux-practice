import type { AnyAction } from 'redux';
import type { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import { sagaError } from '@actions/error/error.action';

export function commonMiddleware(saga: any): Saga {
    return function* (action: AnyAction) {
        try {
            const { payload } = action;

            const response = yield call(saga, action);

            payload.callback?.(response);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;

                const { message } = axiosError;

                const statusCode = axiosError.response?.status || -1;

                yield put(sagaError({ message, statusCode }));
            }
        }
    };
}
