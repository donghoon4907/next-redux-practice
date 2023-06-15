import { Action } from 'redux';

export const ERROR_KEY = 'COMMON_ERROR';

export const ErrorActionTypes = {
    ERROR: ERROR_KEY,
} as const;

export interface ErrorPayload {
    message: string;
    statusCode: number;
}

export interface SagaErrorAction extends Action<string> {
    payload: ErrorPayload;
}

export function sagaError(payload: ErrorPayload): SagaErrorAction {
    return {
        type: ErrorActionTypes.ERROR,
        payload,
    };
}
