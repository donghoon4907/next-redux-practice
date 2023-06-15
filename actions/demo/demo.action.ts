import { CorePayload } from '@interfaces/core';
import { Action } from 'redux';

export const CREATE_DEMO_KEY = 'CREATE_DEMO';

export const DemoActionTypes = {
    REQUEST: `${CREATE_DEMO_KEY}_REQUEST`,
    SUCCESS: `${CREATE_DEMO_KEY}_SUCCESS`,
    FAILURE: `${CREATE_DEMO_KEY}_FAILURE`,
} as const;

export interface DemoRequestPayload extends CorePayload {
    searchKeyword?: string;
    order?: string;
}

export interface DemoSuccessPayload {
    fields: any;
    data: any;
}

export interface DemoRequestAction extends Action<string> {
    payload: DemoRequestPayload;
}

export interface DemoSuccessAction extends Action<string> {
    payload: DemoSuccessPayload;
}

export function demoRequest(payload: DemoRequestPayload): DemoRequestAction {
    return {
        type: DemoActionTypes.REQUEST,
        payload,
    };
}

export function demoSuccess(payload: DemoSuccessPayload): DemoSuccessAction {
    return {
        type: DemoActionTypes.SUCCESS,
        payload,
    };
}
