import { GetProductsRequestAction } from '@actions/hr/get-products';
import { call, put, takeEvery } from 'redux-saga/effects';
import hrsService from '@services/hrsService';
import { commonMiddleware } from '@utils/generators/common';
import {
    GetProductsActionTypes,
    getProductsSuccess,
} from '@actions/hr/get-products';

function* getProductsSaga({ payload }: GetProductsRequestAction) {
    const { data } = yield call(hrsService.getProducts, payload);

    yield put(
        getProductsSuccess({
            data,
            wcode: payload.wcode,
        }),
    );

    return data;
}

export function* watchGetProducts() {
    yield takeEvery(
        GetProductsActionTypes.REQUEST,
        commonMiddleware(getProductsSaga),
    );
}
