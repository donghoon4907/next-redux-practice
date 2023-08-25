import type { Action } from 'redux';

export const LOADED_CONTRACTOR_KEY = 'WR-LOADED-CONTRACTOR';

export const LOADED_INSURED_PERSON_KEY = 'WR-LOADED-INSURED-PERSON';

export const LoadedContractorActionTypes = {
    UPDATE: `UPDATE_${LOADED_CONTRACTOR_KEY}`,
} as const;

export const LoadedInsuredPersonActionTypes = {
    UPDATE: `UPDATE_${LOADED_INSURED_PERSON_KEY}`,
} as const;

export type LoadedContractorUpdatePayload = any;

export type LoadedInsuredPersonUpdatePayload = any;

export interface LoadedContractUpdateAction extends Action<string> {
    payload: LoadedContractorUpdatePayload;
}

export interface LoadedInsuredPersonUpdateAction extends Action<string> {
    payload: LoadedInsuredPersonUpdatePayload;
}

export function updateLoadedContractor(
    payload: LoadedContractorUpdatePayload,
): LoadedContractUpdateAction {
    return {
        type: LoadedContractorActionTypes.UPDATE,
        payload,
    };
}

export function updateLoadedInsuredPerson(
    payload: LoadedInsuredPersonUpdatePayload,
): LoadedInsuredPersonUpdateAction {
    return {
        type: LoadedInsuredPersonActionTypes.UPDATE,
        payload,
    };
}
