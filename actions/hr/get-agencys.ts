import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_AGENCIESS_KEY = 'GET_AGENCIESS';

export const GetAgenciesActionTypes = {
    REQUEST: `${GET_AGENCIESS_KEY}_REQUEST`,
    SUCCESS: `${GET_AGENCIESS_KEY}_SUCCESS`,
    FAILURE: `${GET_AGENCIESS_KEY}_FAILURE`,
} as const;

export type GetAgenciesSuccessPayload = CoreSelectOption[];

export interface GetAgenciesRequestAction extends Action<string> {}

export interface GetAgenciesSuccessAction extends Action<string> {
    payload: GetAgenciesSuccessPayload;
}

export function getAgenciesRequest(): GetAgenciesRequestAction {
    return {
        type: GetAgenciesActionTypes.REQUEST,
    };
}

export function getAgenciesSuccess(
    payload: GetAgenciesSuccessPayload,
): GetAgenciesSuccessAction {
    return {
        type: GetAgenciesActionTypes.SUCCESS,
        payload,
    };
}
