import type { Action } from 'redux';

export const SET_INFO_CUST_MODAL_KEY = 'SET_INFO_CUST-MODAL';

export const SetInfoCustModalActionTypes = {
    SHOW: `SHOW_${SET_INFO_CUST_MODAL_KEY}`,
    HIDE: `HIDE_${SET_INFO_CUST_MODAL_KEY}`,
} as const;

export interface SetInfoCustModalShowAction extends Action<string> {}

export interface SetInfoCustModalHideAction extends Action<string> {}

export function showSetInfoCustModal(): SetInfoCustModalShowAction {
    return {
        type: SetInfoCustModalActionTypes.SHOW,
    };
}

export function hideSetInfoCustModal(): SetInfoCustModalHideAction {
    return {
        type: SetInfoCustModalActionTypes.HIDE,
    };
}
