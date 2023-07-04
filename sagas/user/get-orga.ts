import type { GetOrgasRequestAction } from '@actions/user/get-orgas';
import type { Orga } from '@models/orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';
import usersService from '@services/usersService';
import { sagaError } from '@actions/error/error.action';
import { GetOrgasActionTypes, getOrgasSuccess } from '@actions/user/get-orgas';

function* getOrgasSaga({ payload }: GetOrgasRequestAction) {
    try {
        const { data } = yield call(usersService.getOrgas, payload);

        const orgas = data.map((v: Orga) => ({
            label: v.fulls,
            value: v.idx,
        }));

        yield put(getOrgasSuccess(orgas));
        // 클라이언트 전송 실수 혹은 500 에러
    } catch (err) {
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError;

            const { message } = axiosError;

            const statusCode = axiosError.response?.status || -1;

            yield put(sagaError({ message, statusCode }));
        }
    }
}

export function* watchGetOrgas() {
    yield takeEvery(GetOrgasActionTypes.REQUEST, getOrgasSaga);
}
