import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const SEARCH_USERS_KEY = 'SEARCH_USERS';

export const SearchUsersActionTypes = {
    REQUEST: `${SEARCH_USERS_KEY}_REQUEST`,
    SUCCESS: `${SEARCH_USERS_KEY}_SUCCESS`,
    FAILURE: `${SEARCH_USERS_KEY}_FAILURE`,
} as const;

export interface SearchUsersRequestPayload
    extends CorePayload,
        CorePaginateOption {
    condition?: any;
}

export interface SearchUsersSuccessPayload
    extends CorePaginateSuccessPayload<SearchUsersRequestPayload> {}

export interface SearchUsersRequestAction extends Action<string> {
    payload: SearchUsersRequestPayload;
}

export interface SearchUsersSuccessAction extends Action<string> {
    payload: SearchUsersSuccessPayload;
}

export function searchUsersRequest(
    payload: SearchUsersRequestPayload,
): SearchUsersRequestAction {
    return {
        type: SearchUsersActionTypes.REQUEST,
        payload,
    };
}

export function searchUsersSuccess(
    payload: SearchUsersSuccessPayload,
): SearchUsersSuccessAction {
    return {
        type: SearchUsersActionTypes.SUCCESS,
        payload,
    };
}
