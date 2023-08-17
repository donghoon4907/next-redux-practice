import type { Action } from 'redux';
import type { Product } from '@models/product';

export const LONG_PRODUCT_KEY = 'WR-LONG_PRODUCT';

export const LongProductActionTypes = {
    UPDATE: `UPDATE_${LONG_PRODUCT_KEY}`,
} as const;

export interface LongProductUpdatePayload extends Product {}

export interface LongProductUpdateAction extends Action<string> {
    payload: LongProductUpdatePayload;
}

export function updateLongProduct(
    payload: LongProductUpdatePayload,
): LongProductUpdateAction {
    return {
        type: LongProductActionTypes.UPDATE,
        payload,
    };
}
