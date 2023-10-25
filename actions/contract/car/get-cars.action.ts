import type { Action } from 'redux';
import type {
    CorePaginateOption,
    CorePaginateSuccessPayload,
    CorePayload,
} from '@interfaces/core';

export const GET_CARS_KEY = 'GET_CARS';

export const GetCarsActionTypes = {
    REQUEST: `${GET_CARS_KEY}_REQUEST`,
    SUCCESS: `${GET_CARS_KEY}_SUCCESS`,
    FAILURE: `${GET_CARS_KEY}_FAILURE`,
} as const;

export interface GetCarsRequestPayload
    extends CorePayload,
        CorePaginateOption {}

export interface GetCarsSuccessPayload
    extends CorePaginateSuccessPayload<GetCarsRequestPayload> {}

export interface GetCarsRequestAction extends Action<string> {
    payload: GetCarsRequestPayload;
}

export interface GetCarsSuccessAction extends Action<string> {
    payload: GetCarsSuccessPayload;
}

export function getCarsRequest(
    payload: GetCarsRequestPayload,
): GetCarsRequestAction {
    return {
        type: GetCarsActionTypes.REQUEST,
        payload,
    };
}

export function getCarsSuccess(
    payload: GetCarsSuccessPayload,
): GetCarsSuccessAction {
    return {
        type: GetCarsActionTypes.SUCCESS,
        payload,
    };
}
