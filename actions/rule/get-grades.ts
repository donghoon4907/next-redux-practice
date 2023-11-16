import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_GRADES_KEY = 'GET_GRADES';

export const GetGradesActionTypes = {
    REQUEST: `${GET_GRADES_KEY}_REQUEST`,
    SUCCESS: `${GET_GRADES_KEY}_SUCCESS`,
    FAILURE: `${GET_GRADES_KEY}_FAILURE`,
} as const;

export type GetGradesSuccessPayload = CoreSelectOption[];

export interface GetGradesRequestAction extends Action<string> {}

export interface GetGradesSuccessAction extends Action<string> {
    payload: GetGradesSuccessPayload;
}

export function getGradesRequest(): GetGradesRequestAction {
    return {
        type: GetGradesActionTypes.REQUEST,
    };
}

export function getGradesSuccess(
    payload: GetGradesSuccessPayload,
): GetGradesSuccessAction {
    return {
        type: GetGradesActionTypes.SUCCESS,
        payload,
    };
}
