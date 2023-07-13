import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Company } from '@models/company';

export const GET_COMPANIES_KEY = 'GET_COMPANIES';

export const GetCompaniesActionTypes = {
    REQUEST: `${GET_COMPANIES_KEY}_REQUEST`,
    SUCCESS: `${GET_COMPANIES_KEY}_SUCCESS`,
    FAILURE: `${GET_COMPANIES_KEY}_FAILURE`,
} as const;

export interface GetCompaniesRequestPayload extends CorePayload {}

export type GetCompaniesSuccessPayload = Company[];

export interface GetCompaniesRequestAction extends Action<string> {
    payload: GetCompaniesRequestPayload;
}

export interface GetCompaniesSuccessAction extends Action<string> {
    payload: GetCompaniesSuccessPayload;
}

export function getCompaniesRequest(
    payload: GetCompaniesRequestPayload,
): GetCompaniesRequestAction {
    return {
        type: GetCompaniesActionTypes.REQUEST,
        payload,
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
