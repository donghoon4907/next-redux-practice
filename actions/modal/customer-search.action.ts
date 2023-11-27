import type { Action } from 'redux';

export const CONTRACTOR_SEARCH_MODAL_KEY = 'CONTRACTOR-SEARCH-MODAL';

export const ContractorSearchModalActionTypes = {
    SHOW: `SHOW_${CONTRACTOR_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${CONTRACTOR_SEARCH_MODAL_KEY}`,
} as const;

export interface ContractorSearchModalShowAction extends Action<string> {}

export interface ContractorSearchModalHideAction extends Action<string> {}

export function showContractorSearchModal(): ContractorSearchModalShowAction {
    return {
        type: ContractorSearchModalActionTypes.SHOW,
    };
}

export function hideContractorSearchModal(): ContractorSearchModalHideAction {
    return {
        type: ContractorSearchModalActionTypes.HIDE,
    };
}
