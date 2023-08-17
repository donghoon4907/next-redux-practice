import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Spe } from '@models/spe';

export const GET_PRODUCTS_KEY = 'GET_PRODUCTS';

export const GetProductsActionTypes = {
    REQUEST: `${GET_PRODUCTS_KEY}_REQUEST`,
    SUCCESS: `${GET_PRODUCTS_KEY}_SUCCESS`,
    FAILURE: `${GET_PRODUCTS_KEY}_FAILURE`,
} as const;

export interface GetProductsRequestPayload extends CorePayload {
    spe: Spe;
    wcode: string;
    type: string;
}

export type GetProductsSuccessPayload = Array<any>;

export interface GetProductsRequestAction extends Action<string> {
    payload: GetProductsRequestPayload;
}

export interface GetProductsSuccessAction extends Action<string> {
    payload: GetProductsSuccessPayload;
}

export function getProductsRequest(
    payload: GetProductsRequestPayload,
): GetProductsRequestAction {
    return {
        type: GetProductsActionTypes.REQUEST,
        payload,
    };
}

export function getProductsSuccess(
    payload: GetProductsSuccessPayload,
): GetProductsSuccessAction {
    return {
        type: GetProductsActionTypes.SUCCESS,
        payload,
    };
}
