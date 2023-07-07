import type { CorePayload } from '@interfaces/core';
import type { Action } from 'redux';

export const LOGIN_KEY = 'LOGIN';

export const LoginActionTypes = {
    REQUEST: `${LOGIN_KEY}_REQUEST`,
    SUCCESS: `${LOGIN_KEY}_SUCCESS`,
    FAILURE: `${LOGIN_KEY}_FAILURE`,
} as const;

export interface LoginRequestPayload extends CorePayload {
    userid: string;
    password: string;
}

export interface LoginSuccessPayload {
    access_token: string;
}

export interface LoginRequestAction extends Action<string> {
    payload: LoginRequestPayload;
}

export interface LoginSuccessAction extends Action<string> {
    // payload: LoginSuccessPayload;
}

export function loginRequest(payload: LoginRequestPayload): LoginRequestAction {
    return {
        type: LoginActionTypes.REQUEST,
        payload,
    };
}

export function loginSuccess(): LoginSuccessAction {
    // payload: LoginSuccessPayload
    return {
        type: LoginActionTypes.SUCCESS,
        // payload,
    };
}
