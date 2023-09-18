import type { GetContractorRequestAction } from '@actions/contract/common/set-contractor.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import customersService from '@services/customersService';
import { commonMiddleware } from '@utils/generators/common';
import {
    LoadedContractorActionTypes,
    getContractorSuccess,
} from '@actions/contract/common/set-contractor.action';

function* getContractorSaga({ payload }: GetContractorRequestAction) {
    const { data } = yield call(customersService.lazyGetCustomer, payload);

    yield put(getContractorSuccess(data));

    return data;
}

export function* watchGetContractor() {
    yield takeEvery(
        LoadedContractorActionTypes.REQUEST,
        commonMiddleware(getContractorSaga),
    );
}
