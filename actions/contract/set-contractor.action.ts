import type { Action } from 'redux';

export const LOADED_CONTRACTOR_KEY = 'WR-LOADED-CONTRACTOR';

export const LOADED_INSURED_KEY = 'WR-LOADED-INSURED';

export const LoadedContractorActionTypes = {
    UPDATE: `UPDATE_${LOADED_CONTRACTOR_KEY}`,
} as const;

export const LoadedInsuredActionTypes = {
    UPDATE: `UPDATE_${LOADED_INSURED_KEY}`,
} as const;

export type LoadedContractorUpdatePayload = any;

export type LoadedInsuredUpdatePayload = any;

export interface LoadedContractUpdateAction extends Action<string> {
    payload: LoadedContractorUpdatePayload;
}

export interface LoadedInsuredUpdateAction extends Action<string> {
    payload: LoadedInsuredUpdatePayload;
}

export function updateLoadedContractor(
    payload: LoadedContractorUpdatePayload,
): LoadedContractUpdateAction {
    return {
        type: LoadedContractorActionTypes.UPDATE,
        payload,
    };
}

export function updateLoadedInsured(
    payload: LoadedInsuredUpdatePayload,
): LoadedInsuredUpdateAction {
    return {
        type: LoadedInsuredActionTypes.UPDATE,
        payload,
    };
}
