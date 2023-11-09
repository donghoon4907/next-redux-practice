import type {
    GetEstimateRequestAction,
    GetEstimateRequestPayload,
    GetEstimateSuccessAction,
    GetEstimateSuccessPayload,
} from './get-estimate.action';

export const GET_LAZY_ESTIMATE_KEY = 'GET_LAZY_ESTIMATE';

export const GetLazyEstimateActionTypes = {
    REQUEST: `${GET_LAZY_ESTIMATE_KEY}_REQUEST`,
    SUCCESS: `${GET_LAZY_ESTIMATE_KEY}_SUCCESS`,
    FAILURE: `${GET_LAZY_ESTIMATE_KEY}_FAILURE`,
} as const;

export interface GetLazyEstimateRequestPayload
    extends GetEstimateRequestPayload {}

export type GetLazyEstimateSuccessPayload = GetEstimateSuccessPayload;

export interface GetLazyEstimateRequestAction
    extends GetEstimateRequestAction {}

export interface GetLazyEstimateSuccessAction
    extends GetEstimateSuccessAction {}

export function getLazyEstimateRequest(
    payload: GetLazyEstimateRequestPayload,
): GetLazyEstimateRequestAction {
    return {
        type: GetLazyEstimateActionTypes.REQUEST,
        payload,
    };
}

export function getLazyEstimateSuccess(
    payload: GetLazyEstimateSuccessPayload,
): GetLazyEstimateSuccessAction {
    return {
        type: GetLazyEstimateActionTypes.SUCCESS,
        payload,
    };
}
