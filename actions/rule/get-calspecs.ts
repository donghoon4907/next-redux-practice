import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Spe } from '@models/spe';

export const GET_CALSPECS_KEY = 'GET_CALSPECS';

export const GetCalspecsActionTypes = {
    REQUEST: `${GET_CALSPECS_KEY}_REQUEST`,
    SUCCESS: `${GET_CALSPECS_KEY}_SUCCESS`,
    FAILURE: `${GET_CALSPECS_KEY}_FAILURE`,
} as const;

export interface GetCalspecsRequestPayload {
    wcode: string;
    spe: Spe;
}

export type GetCalspecsSuccessPayload = CoreSelectOption[];

export interface GetCalspecsRequestAction extends Action<string> {
    payload: GetCalspecsRequestPayload;
}

export interface GetCalspecsSuccessAction extends Action<string> {
    payload: GetCalspecsSuccessPayload;
}

export function getCalspecsRequest(
    payload: GetCalspecsRequestPayload,
): GetCalspecsRequestAction {
    return {
        type: GetCalspecsActionTypes.REQUEST,
        payload,
    };
}

export function getCalspecsSuccess(
    payload: GetCalspecsSuccessPayload,
): GetCalspecsSuccessAction {
    return {
        type: GetCalspecsActionTypes.SUCCESS,
        payload,
    };
}
