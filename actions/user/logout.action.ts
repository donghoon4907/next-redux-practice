import type { Action } from 'redux';

export const LOGOUT_KEY = 'LOGOUT';

export const LogoutActionTypes = {
    REQUEST: `${LOGOUT_KEY}_REQUEST`,
    SUCCESS: `${LOGOUT_KEY}_SUCCESS`,
    FAILURE: `${LOGOUT_KEY}_FAILURE`,
} as const;

export interface LogoutRequestAction extends Action<string> {}

export interface LogoutSuccessAction extends Action<string> {}

export function logoutRequest(): LogoutRequestAction {
    return {
        type: LogoutActionTypes.REQUEST,
    };
}

export function logoutSuccess(): LogoutSuccessAction {
    return {
        type: LogoutActionTypes.SUCCESS,
    };
}
