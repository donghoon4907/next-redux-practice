import type { Action } from 'redux';

export const CUSTOMER_SEARCH_MODAL_KEY = 'CUSTOMER_SEARCH_MODAL_KEY';

export const CustomerSearchModalActionTypes = {
    SHOW: `SHOW_${CUSTOMER_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${CUSTOMER_SEARCH_MODAL_KEY}`,
} as const;

export interface CustomerSearchModalShowAction extends Action<string> {}

export interface CustomerSearchModalHideAction extends Action<string> {}

export function showCustomerSearchModal(): CustomerSearchModalShowAction {
    return {
        type: CustomerSearchModalActionTypes.SHOW,
    };
}

export function hideCustomerSearchModal(): CustomerSearchModalHideAction {
    return {
        type: CustomerSearchModalActionTypes.HIDE,
    };
}
