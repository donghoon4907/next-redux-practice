import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Spe } from '@models/spe';

export const GET_SUDISTS_KEY = 'GET_SUDISTS';

export const GetSudistsActionTypes = {
    REQUEST: `${GET_SUDISTS_KEY}_REQUEST`,
    SUCCESS: `${GET_SUDISTS_KEY}_SUCCESS`,
    FAILURE: `${GET_SUDISTS_KEY}_FAILURE`,
} as const;

export interface GetSudistsRequestPayload {
    spe: Spe;
}

export type GetSudistsSuccessPayload = CoreSelectOption[];

export interface GetSudistsRequestAction extends Action<string> {
    payload: GetSudistsRequestPayload;
}

export interface GetSudistsSuccessAction extends Action<string> {
    payload: GetSudistsSuccessPayload;
}

export function getSudistsRequest(
    payload: GetSudistsRequestPayload,
): GetSudistsRequestAction {
    return {
        type: GetSudistsActionTypes.REQUEST,
        payload,
    };
}

export function getSudistsSuccess(
    payload: GetSudistsSuccessPayload,
): GetSudistsSuccessAction {
    return {
        type: GetSudistsActionTypes.SUCCESS,
        payload,
    };
}
