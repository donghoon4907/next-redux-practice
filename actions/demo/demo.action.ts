import { CorePayload } from '@interfaces/core';
import { Action } from 'redux';

export const CREATE_DEMO_KEY = 'CREATE_DEMO';

export enum DemoActionTypes {
    REQUEST = `${CREATE_DEMO_KEY}_REQUEST`,
    SUCCESS = `${CREATE_DEMO_KEY}_SUCCESS`,
    FAILURE = `${CREATE_DEMO_KEY}_FAILURE`,
}

export interface DemoRequestPayload extends CorePayload {
    searchKeyword?: string;
    order?: string;
}

export interface DemoSuccessPayload {}

export interface DemoRequestAction extends Action<DemoActionTypes.REQUEST> {
    payload: DemoRequestPayload;
}

export interface DemoSuccessAction extends Action<DemoActionTypes.SUCCESS> {
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
