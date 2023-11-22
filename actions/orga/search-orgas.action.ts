import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const SEARCH_ORGAS_KEY = 'SEARCH_ORGAS';

export const SearchOrgasActionTypes = {
    REQUEST: `${SEARCH_ORGAS_KEY}_REQUEST`,
    SUCCESS: `${SEARCH_ORGAS_KEY}_SUCCESS`,
    FAILURE: `${SEARCH_ORGAS_KEY}_FAILURE`,
} as const;

export interface SearchOrgasRequestPayload
    extends CorePayload,
        CorePaginateOption {
    condition?: {
        search?: string;
        orga?: string;
        orga_rate?: string;
        status?: string;
        indate?: [string, string];
        outdate?: [string, string];
    };
}

export interface SearchOrgasSuccessPayload
    extends CorePaginateSuccessPayload<SearchOrgasRequestPayload> {}

export interface SearchOrgasRequestAction extends Action<string> {
    payload: SearchOrgasRequestPayload;
}

export interface SearchOrgasSuccessAction extends Action<string> {
    payload: SearchOrgasSuccessPayload;
}

export function searchOrgasRequest(
    payload: SearchOrgasRequestPayload,
): SearchOrgasRequestAction {
    return {
        type: SearchOrgasActionTypes.REQUEST,
        payload,
    };
}

export function searchOrgasSuccess(
    payload: SearchOrgasSuccessPayload,
): SearchOrgasSuccessAction {
    return {
        type: SearchOrgasActionTypes.SUCCESS,
        payload,
    };
}
