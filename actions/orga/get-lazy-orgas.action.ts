import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Orga } from '@models/orga';

export const GET_LAZY_ORGAS_KEY = 'GET_LAZY_ORGAS';

export const GetLazyOrgasActionTypes = {
    REQUEST: `${GET_LAZY_ORGAS_KEY}_REQUEST`,
    SUCCESS: `${GET_LAZY_ORGAS_KEY}_SUCCESS`,
    FAILURE: `${GET_LAZY_ORGAS_KEY}_FAILURE`,
} as const;

export interface GetLazyOrgasRequestPayload extends CorePayload {
    idx: string;
    rate: string;
}

export type GetLazyOrgasSuccessPayload = Orga[];

export interface GetLazyOrgasRequestAction extends Action<string> {
    payload: GetLazyOrgasRequestPayload;
}

export interface GetLazyOrgasSuccessAction extends Action<string> {
    payload: GetLazyOrgasSuccessPayload;
}

export function getLazyOrgasRequest(
    payload: GetLazyOrgasRequestPayload,
): GetLazyOrgasRequestAction {
    return {
        type: GetLazyOrgasActionTypes.REQUEST,
        payload,
    };
}

export function getLazyOrgasSuccess(
    payload: GetLazyOrgasSuccessPayload,
): GetLazyOrgasSuccessAction {
    return {
        type: GetLazyOrgasActionTypes.SUCCESS,
        payload,
    };
}
