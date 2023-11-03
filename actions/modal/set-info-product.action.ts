import type { Action } from 'redux';

export const SET_INFO_PRODUCT_MODAL_KEY = 'SET_INFO_PRODUCT-MODAL';

export const SetInfoProductModalActionTypes = {
    SHOW: `SHOW_${SET_INFO_PRODUCT_MODAL_KEY}`,
    HIDE: `HIDE_${SET_INFO_PRODUCT_MODAL_KEY}`,
} as const;

export interface SetInfoProductModalShowAction extends Action<string> {}

export interface SetInfoProductModalHideAction extends Action<string> {}

export function showSetInfoProductModal(): SetInfoProductModalShowAction {
    return {
        type: SetInfoProductModalActionTypes.SHOW,
    };
}

export function hideSetInfoProductModal(): SetInfoProductModalHideAction {
    return {
        type: SetInfoProductModalActionTypes.HIDE,
    };
}
