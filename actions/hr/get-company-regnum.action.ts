import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_COMPANYREGNUM_KEY = 'GET_COMPANYREGNUM';

export const GetCompanyRegNumActionTypes = {
    REQUEST: `${GET_COMPANYREGNUM_KEY}_REQUEST`,
    SUCCESS: `${GET_COMPANYREGNUM_KEY}_SUCCESS`,
    FAILURE: `${GET_COMPANYREGNUM_KEY}_FAILURE`,
} as const;

export interface GetCompanyRegNumRequestPayload extends CorePayload {
    num: string;
}

export interface GetCompanyRegNumRequestAction extends Action<string> {
    payload: GetCompanyRegNumRequestPayload;
}

export interface GetCompanyRegNumSuccessAction extends Action<string> {}

export function getCompanyRegNumRequest(
    payload: GetCompanyRegNumRequestPayload,
): GetCompanyRegNumRequestAction {
    return {
        type: GetCompanyRegNumActionTypes.REQUEST,
        payload,
    };
}

export function getCompanyRegNumSuccess(): GetCompanyRegNumSuccessAction {
    return {
        type: GetCompanyRegNumActionTypes.SUCCESS,
    };
}
