import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_COMPANIES_KEY = 'GET_COMPANIES';

export const GetCompaniesActionTypes = {
    REQUEST: `${GET_COMPANIES_KEY}_REQUEST`,
    SUCCESS: `${GET_COMPANIES_KEY}_SUCCESS`,
    FAILURE: `${GET_COMPANIES_KEY}_FAILURE`,
} as const;

export type GetCompaniesSuccessPayload = CoreSelectOption[];

export interface GetCompaniesRequestAction extends Action<string> {}

export interface GetCompaniesSuccessAction extends Action<string> {
    payload: GetCompaniesSuccessPayload;
}

export function getCompaniesRequest(): GetCompaniesRequestAction {
    return {
        type: GetCompaniesActionTypes.REQUEST,
    };
}

export function getCompaniesSuccess(
    payload: GetCompaniesSuccessPayload,
): GetCompaniesSuccessAction {
    return {
        type: GetCompaniesActionTypes.SUCCESS,
        payload,
    };
}
