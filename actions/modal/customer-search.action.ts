import type { Action } from 'redux';

export const CONTRACTOR_SEARCH_MODAL_KEY = 'CONTRACTOR-SEARCH-MODAL';

export const INSURED_PERSON_SEARCH_MODAL_KEY = 'INSURED-PERSON-SEARCH-MODAL';

export const ContractorSearchModalActionTypes = {
    SHOW: `SHOW_${CONTRACTOR_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${CONTRACTOR_SEARCH_MODAL_KEY}`,
} as const;

export const InsuredPersonSearchModalActionTypes = {
    SHOW: `SHOW_${INSURED_PERSON_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${INSURED_PERSON_SEARCH_MODAL_KEY}`,
} as const;

export interface ContractorSearchModalShowAction extends Action<string> {}

export interface InsuredPersonSearchModalShowAction extends Action<string> {}

export interface ContractorSearchModalHideAction extends Action<string> {}

export interface InsuredPersonSearchModalHideAction extends Action<string> {}

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

export function showInsuredPersonSearchModal(): InsuredPersonSearchModalShowAction {
    return {
        type: InsuredPersonSearchModalActionTypes.SHOW,
    };
}

export function hideInsuredPersonSearchModal(): InsuredPersonSearchModalHideAction {
    return {
        type: InsuredPersonSearchModalActionTypes.HIDE,
    };
}
