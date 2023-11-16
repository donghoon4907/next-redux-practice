import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_MAKEABLE_RATES_KEY = 'GET_MAKEABLE_RATES';

export const GetMakeableRatesActionTypes = {
    REQUEST: `${GET_MAKEABLE_RATES_KEY}_REQUEST`,
    SUCCESS: `${GET_MAKEABLE_RATES_KEY}_SUCCESS`,
    FAILURE: `${GET_MAKEABLE_RATES_KEY}_FAILURE`,
} as const;

export type GetMakeableRatesSuccessPayload = CoreSelectOption[];

export interface GetMakeableRatesRequestAction extends Action<string> {}

export interface GetMakeableRatesSuccessAction extends Action<string> {
    payload: GetMakeableRatesSuccessPayload;
}

export function getMakeableRatesRequest(): GetMakeableRatesRequestAction {
    return {
        type: GetMakeableRatesActionTypes.REQUEST,
    };
}

export function getMakeableRatesSuccess(
    payload: GetMakeableRatesSuccessPayload,
): GetMakeableRatesSuccessAction {
    return {
        type: GetMakeableRatesActionTypes.SUCCESS,
        payload,
    };
}
