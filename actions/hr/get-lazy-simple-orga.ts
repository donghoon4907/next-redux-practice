import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { SimpleOrga } from '@models/orga';

export const GET_LAZY_SIMPLE_ORGA_KEY = 'GET_LAZY_SIMPLE_ORGA';

export const GetLazySimpleOrgaActionTypes = {
    REQUEST: `${GET_LAZY_SIMPLE_ORGA_KEY}_REQUEST`,
    SUCCESS: `${GET_LAZY_SIMPLE_ORGA_KEY}_SUCCESS`,
    FAILURE: `${GET_LAZY_SIMPLE_ORGA_KEY}_FAILURE`,
} as const;

export interface GetLazySimpleOrgaRequestPayload extends CorePayload {
    idx: string;
}

export type GetLazySimpleOrgaSuccessPayload = SimpleOrga;

export interface GetLazySimpleOrgaRequestAction extends Action<string> {
    payload: GetLazySimpleOrgaRequestPayload;
}

export interface GetLazySimpleOrgaSuccessAction extends Action<string> {
    payload: GetLazySimpleOrgaSuccessPayload;
}

export function getLazySimpleOrgaRequest(
    payload: GetLazySimpleOrgaRequestPayload,
): GetLazySimpleOrgaRequestAction {
    return {
        type: GetLazySimpleOrgaActionTypes.REQUEST,
        payload,
    };
}

export function getLazySimpleOrgaSuccess(
    payload: GetLazySimpleOrgaSuccessPayload,
): GetLazySimpleOrgaSuccessAction {
    return {
        type: GetLazySimpleOrgaActionTypes.SUCCESS,
        payload,
    };
}
