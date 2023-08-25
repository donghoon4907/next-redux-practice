import type { Action } from 'redux';
import type { Product } from '@models/product';

export const PRODUCT_KEY = 'WR-PRODUCT';

export const ProductActionTypes = {
    UPDATE: `UPDATE_${PRODUCT_KEY}`,
} as const;

export interface ProductUpdatePayload extends Product {}

export interface ProductUpdateAction extends Action<string> {
    payload: ProductUpdatePayload;
}

export function updateProduct(
    payload: ProductUpdatePayload,
): ProductUpdateAction {
    return {
        type: ProductActionTypes.UPDATE,
        payload,
    };
}
