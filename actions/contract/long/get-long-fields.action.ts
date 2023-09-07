import type { Action } from 'redux';

export const GET_LONG_FIELDS_KEY = 'GET_LONG_FIELDS';

export const GetLongFieldsActionTypes = {
    REQUEST: `${GET_LONG_FIELDS_KEY}_REQUEST`,
    SUCCESS: `${GET_LONG_FIELDS_KEY}_SUCCESS`,
    FAILURE: `${GET_LONG_FIELDS_KEY}_FAILURE`,
} as const;

export type GetLongFieldsSuccessPayload = Record<string, any>;

export interface GetLongFieldsRequestAction extends Action<string> {}

export interface GetLongFieldsSuccessAction extends Action<string> {
    payload: GetLongFieldsSuccessPayload;
}

export function getLongFieldsRequest(): GetLongFieldsRequestAction {
    return {
        type: GetLongFieldsActionTypes.REQUEST,
    };
}

export function getLongFieldsSuccess(
    payload: GetLongFieldsSuccessPayload,
): GetLongFieldsSuccessAction {
    return {
        type: GetLongFieldsActionTypes.SUCCESS,
        payload,
    };
}
