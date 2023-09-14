import type { Action } from 'redux';

export const GET_CARCODE_MODAL_KEY = 'GET_CARCODE-MODAL';

export const GetCarcodeModalActionTypes = {
    SHOW: `SHOW_${GET_CARCODE_MODAL_KEY}`,
    HIDE: `HIDE_${GET_CARCODE_MODAL_KEY}`,
} as const;

export interface GetCarcodeModalShowAction extends Action<string> {}

export interface GetCarcodeModalHideAction extends Action<string> {}

export function showGetCarcodeModal(): GetCarcodeModalShowAction {
    return {
        type: GetCarcodeModalActionTypes.SHOW,
    };
}

export function hideGetCarcodeModal(): GetCarcodeModalHideAction {
    return {
        type: GetCarcodeModalActionTypes.HIDE,
    };
}
