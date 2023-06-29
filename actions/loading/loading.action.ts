import { Action } from 'redux';

export const LOADING_KEY = 'LOADING';

export const LoadingActionTypes = {
    ON: `${LOADING_KEY}_REQUEST`,
    OFF: `${LOADING_KEY}_SUCCESS`,
} as const;

export interface LoadingOnAction extends Action<string> {}

export interface LoadingOffAction extends Action<string> {}

export function loadingOn(): LoadingOnAction {
    return {
        type: LoadingActionTypes.ON,
    };
}

export function loadingOff(): LoadingOffAction {
    return {
        type: LoadingActionTypes.OFF,
    };
}
