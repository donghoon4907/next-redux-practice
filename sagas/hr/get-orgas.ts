import type { GetOrgasRequestAction } from '@actions/user/get-orgas';
import type { Orga } from '@models/orga';
import { call, put, takeEvery } from 'redux-saga/effects';
import usersService from '@services/usersService';
import { GetOrgasActionTypes, getOrgasSuccess } from '@actions/user/get-orgas';
import { commonMiddleware } from '@utils/generators/common';

function* getOrgasSaga({ payload }: GetOrgasRequestAction) {
    const { data } = yield call(usersService.getOrgas, payload);

    const orgas = data.map((v: Orga) => ({
        label: v.fulls,
        value: v.idx,
    }));

    yield put(getOrgasSuccess(orgas));

    return data;
}

export function* watchGetOrgas() {
    yield takeEvery(
        GetOrgasActionTypes.REQUEST,
        commonMiddleware(getOrgasSaga),
    );
}
