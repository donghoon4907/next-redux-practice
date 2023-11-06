import type { Action } from 'redux';
import type { Spe } from '@models/spe';
import type { CorePaginateSuccessPayload, CorePayload } from '@interfaces/core';

export const GET_CONTACTS_KEY = 'GET_CONTACTS';

export const GetContactsActionTypes = {
    REQUEST: `${GET_CONTACTS_KEY}_REQUEST`,
    SUCCESS: `${GET_CONTACTS_KEY}_SUCCESS`,
    FAILURE: `${GET_CONTACTS_KEY}_FAILURE`,
} as const;

export interface GetContactsRequestPayload extends CorePayload {
    cust_idx: string;
    spe?: Spe;
    cnum?: string;
}

export interface GetContactsSuccessPayload
    extends CorePaginateSuccessPayload<GetContactsRequestPayload> {}

export interface GetContactsRequestAction extends Action<string> {
    payload: GetContactsRequestPayload;
}

export interface GetContactsSuccessAction extends Action<string> {
    payload: GetContactsSuccessPayload;
}

export function getContactsRequest(
    payload: GetContactsRequestPayload,
): GetContactsRequestAction {
    return {
        type: GetContactsActionTypes.REQUEST,
        payload,
    };
}

export function getContactsSuccess(
    payload: GetContactsSuccessPayload,
): GetContactsSuccessAction {
    return {
        type: GetContactsActionTypes.SUCCESS,
        payload,
    };
}
