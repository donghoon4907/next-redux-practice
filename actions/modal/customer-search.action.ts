import type { Action } from 'redux';

export const CONTRACTOR_SEARCH_MODAL_KEY = 'CONTRACTOR-SEARCH-MODAL';

export const INSURED_PERSON_SEARCH_MODAL_KEY = 'INSURED-PERSON-SEARCH-MODAL';

export const ContractorSearchModalActionTypes = {
    SHOW: `SHOW_${CONTRACTOR_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${CONTRACTOR_SEARCH_MODAL_KEY}`,
} as const;

export const InsuredSearchModalActionTypes = {
    SHOW: `SHOW_${INSURED_PERSON_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${INSURED_PERSON_SEARCH_MODAL_KEY}`,
} as const;

export interface ContractorSearchModalShowAction extends Action<string> {}

export interface InsuredSearchModalShowAction extends Action<string> {}

export interface ContractorSearchModalHideAction extends Action<string> {}

export interface InsuredSearchModalHideAction extends Action<string> {}

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

export function showInsuredSearchModal(): InsuredSearchModalShowAction {
    return {
        type: InsuredSearchModalActionTypes.SHOW,
    };
}

export function hideInsuredSearchModal(): InsuredSearchModalHideAction {
    return {
        type: InsuredSearchModalActionTypes.HIDE,
    };
}
