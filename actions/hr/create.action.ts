import type { CorePayload } from '@interfaces/core';
import type { Action } from 'redux';

export const CREATE_USER_KEY = 'CREATE_USER';

export const CreateUserActionTypes = {
    REQUEST: `${CREATE_USER_KEY}_REQUEST`,
    SUCCESS: `${CREATE_USER_KEY}_SUCCESS`,
    FAILURE: `${CREATE_USER_KEY}_FAILURE`,
} as const;

export interface CreateUserRequestPayload extends CorePayload {
    name: string;
    mobile: string;
    orga_idx: number;
    idnum1?: string;
    title?: string;
    birthday?: string;
    birth_type?: boolean;
    mobile_com?: string;
    telephone?: string;
    tel_direct?: string;
    email?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    indate?: string;
    outdate?: string;
    status?: string;
    user_type?: string;
}

export interface CreateUserSuccessPayload {}

export interface CreateUserRequestAction extends Action<string> {
    payload: CreateUserRequestPayload;
}

export interface CreateUserSuccessAction extends Action<string> {}

export function createUserRequest(
    payload: CreateUserRequestPayload,
): CreateUserRequestAction {
    return {
        type: CreateUserActionTypes.REQUEST,
        payload,
    };
}

export function createUserSuccess(): CreateUserSuccessAction {
    // payload: CreateUserSuccessPayload
    return {
        type: CreateUserActionTypes.SUCCESS,
        // payload,
    };
}
