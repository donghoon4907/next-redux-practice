import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_HWANS_KEY = 'GET_HWANS';

export const GetHwansActionTypes = {
    REQUEST: `${GET_HWANS_KEY}_REQUEST`,
    SUCCESS: `${GET_HWANS_KEY}_SUCCESS`,
    FAILURE: `${GET_HWANS_KEY}_FAILURE`,
} as const;

export type GetHwansSuccessPayload = CoreSelectOption[];

export interface GetHwansRequestAction extends Action<string> {}

export interface GetHwansSuccessAction extends Action<string> {
    payload: GetHwansSuccessPayload;
}

export function getHwansRequest(): GetHwansRequestAction {
    return {
        type: GetHwansActionTypes.REQUEST,
    };
}

export function getHwansSuccess(
    payload: GetHwansSuccessPayload,
): GetHwansSuccessAction {
    return {
        type: GetHwansActionTypes.SUCCESS,
        payload,
    };
}
