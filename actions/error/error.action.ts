import { Action } from 'redux';

export const ERROR_KEY = 'COMMON_ERROR';

export enum ErrorActionTypes {
    ERROR = ERROR_KEY,
}

export interface ErrorPayload {
    message: string;
    statusCode: number;
}

export interface SagaErrorAction extends Action<ErrorActionTypes.ERROR> {
    payload: ErrorPayload;
}

export function sagaError(payload: ErrorPayload): SagaErrorAction {
    return {
        type: ErrorActionTypes.ERROR,
        payload,
    };
}
