import type {
    GetEstimatesRequestAction,
    GetEstimatesRequestPayload,
    GetEstimatesSuccessAction,
    GetEstimatesSuccessPayload,
} from './get-estimates.action';

export const GET_ESTIMATES_KEY = 'GET_ESTIMATES';

export const GetLazyEstimatesActionTypes = {
    REQUEST: `${GET_ESTIMATES_KEY}_REQUEST`,
    SUCCESS: `${GET_ESTIMATES_KEY}_SUCCESS`,
    FAILURE: `${GET_ESTIMATES_KEY}_FAILURE`,
} as const;

export interface GetLazyEstimatesRequestPayload
    extends GetEstimatesRequestPayload {}

export interface GetLazyEstimatesSuccessPayload
    extends GetEstimatesSuccessPayload {}

export interface GetLazyEstimatesRequestAction
    extends GetEstimatesRequestAction {}

export interface GetLazyEstimatesSuccessAction
    extends GetEstimatesSuccessAction {}

export function getLazyEstimatesRequest(
    payload: GetLazyEstimatesRequestPayload,
): GetLazyEstimatesRequestAction {
    return {
        type: GetLazyEstimatesActionTypes.REQUEST,
        payload,
    };
}

export function getLazyEstimatesSuccess(
    payload: GetLazyEstimatesSuccessPayload,
): GetLazyEstimatesSuccessAction {
    return {
        type: GetLazyEstimatesActionTypes.SUCCESS,
        payload,
    };
}
