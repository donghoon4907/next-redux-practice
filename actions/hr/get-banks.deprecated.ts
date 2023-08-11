import type { Action } from 'redux';
import type { CorePayload, CoreSelectOption } from '@interfaces/core';

export const GET_BANKS_KEY = 'GET_BANKS';

export const GetBanksActionTypes = {
    REQUEST: `${GET_BANKS_KEY}_REQUEST`,
    SUCCESS: `${GET_BANKS_KEY}_SUCCESS`,
    FAILURE: `${GET_BANKS_KEY}_FAILURE`,
} as const;

export type GetBanksSuccessPayload = CoreSelectOption[];

export interface GetBanksRequestAction extends Action<string> {}

export interface GetBanksSuccessAction extends Action<string> {
    payload: GetBanksSuccessPayload;
}

export function getBanksRequest(): GetBanksRequestAction {
    return {
        type: GetBanksActionTypes.REQUEST,
    };
}

export function getBanksSuccess(
    payload: GetBanksSuccessPayload,
): GetBanksSuccessAction {
    return {
        type: GetBanksActionTypes.SUCCESS,
        payload,
    };
}
