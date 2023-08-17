import type { Action } from 'redux';

export const PRODUCT_SEARCH_MODAL_KEY = 'PRODUCT_SEARCH_MODAL_KEY';

export const ProductSearchModalActionTypes = {
    SHOW: `SHOW_${PRODUCT_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${PRODUCT_SEARCH_MODAL_KEY}`,
} as const;

export interface ProductSearchModalShowAction extends Action<string> {}

export interface ProductSearchModalHideAction extends Action<string> {}

export function showProductSearchModal(): ProductSearchModalShowAction {
    return {
        type: ProductSearchModalActionTypes.SHOW,
    };
}

export function hideProductSearchModal(): ProductSearchModalHideAction {
    return {
        type: ProductSearchModalActionTypes.HIDE,
    };
}
