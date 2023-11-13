import type { AnyAction } from 'redux';
import type { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { sagaError } from '@actions/error/error.action';
import { commonAxiosErrorHandler } from '@utils/error';

export function commonMiddleware(saga: any): Saga {
    return function* (action: AnyAction) {
        try {
            const { payload } = action;

            const response = yield call(saga, action);

            payload.callback?.(response);
        } catch (err) {
            const { message, statusCode } = commonAxiosErrorHandler(err);

            yield put(sagaError({ message, statusCode }));

            if (statusCode === 401) {
                alert('세션이 만료되었습니다. 로그인 페이지로 이동합니다.');

                location.href = '/login';
            } else if (statusCode === 500) {
                alert('서버 요청 중 에러가 발생했습니다.');
            }
        }
    };
}
