import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_ORGA_KEY = 'GET_ORGA';

export const GetOrgaActionTypes = {
    REQUEST: `${GET_ORGA_KEY}_REQUEST`,
    SUCCESS: `${GET_ORGA_KEY}_SUCCESS`,
    FAILURE: `${GET_ORGA_KEY}_FAILURE`,
} as const;

export interface GetOrgaRequestPayload extends CorePayload {
    idx: string;
}

export type GetOrgaSuccessPayload = any;

export interface GetOrgaRequestAction extends Action<string> {
    payload: GetOrgaRequestPayload;
}

export interface GetOrgaSuccessAction extends Action<string> {
    payload: GetOrgaSuccessPayload;
}

export function getOrgaRequest(
    payload: GetOrgaRequestPayload,
): GetOrgaRequestAction {
    return {
        type: GetOrgaActionTypes.REQUEST,
        payload,
    };
}

export function getOrgaSuccess(
    payload: GetOrgaSuccessPayload,
): GetOrgaSuccessAction {
    return {
        type: GetOrgaActionTypes.SUCCESS,
        payload,
    };
}
