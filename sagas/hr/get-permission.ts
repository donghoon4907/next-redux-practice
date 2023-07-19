import type { GetPermissionRequestAction } from '@actions/hr/get-permission.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
// import { sagaError } from '@actions/error/error.action';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetPermissionActionTypes,
    getPermissionSuccess,
} from '@actions/hr/get-permission.action';

function* getPermissionSaga({ payload }: GetPermissionRequestAction) {
    const { data } = yield call(hrsService.getPermission, payload);

    const { user_info } = data;

    if (user_info) {
        yield put(getPermissionSuccess(data));
    } else {
        // 로그인 페이지로 이동;
        location.href = '/login';
    }
}

export function* watchGetPermission() {
    yield takeEvery(
        GetPermissionActionTypes.REQUEST,
        commonMiddleware(getPermissionSaga),
    );
}
