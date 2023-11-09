import type { Action } from 'redux';

export const LOAD_ESTIMATE_KEY = 'WR-LOAD-ESTIMATE';

export const LoadEstimateActionTypes = {
    UPDATE: `UPDATE_${LOAD_ESTIMATE_KEY}`,
} as const;

export type LoadEstimateUpdatePayload = any;

export interface LoadEstimateUpdateAction extends Action<string> {
    payload: LoadEstimateUpdatePayload;
}

export function updateLoadEstimate(
    payload: LoadEstimateUpdatePayload,
): LoadEstimateUpdateAction {
    return {
        type: LoadEstimateActionTypes.UPDATE,
        payload,
    };
}
