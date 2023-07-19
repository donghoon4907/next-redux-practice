import type { CorePayload } from '@interfaces/core';
import type { Action } from 'redux';

export const GET_IP_KEY = 'GET_IP';

export const GetIpActionTypes = {
    REQUEST: `${GET_IP_KEY}_REQUEST`,
    SUCCESS: `${GET_IP_KEY}_SUCCESS`,
    FAILURE: `${GET_IP_KEY}_FAILURE`,
} as const;

export interface GetIpRequestPayload extends CorePayload {
    /**
     * 사용자의 환경이 ipv6인지 여부
     */
    isIPv6: boolean;
}

export interface GetIpSuccessPayload {
    ip: string;
}

export interface GetIpRequestAction extends Action<string> {
    payload: GetIpRequestPayload;
}

export interface GetIpSuccessAction extends Action<string> {
    payload: GetIpSuccessPayload;
}

export function getIpRequest(payload: GetIpRequestPayload): GetIpRequestAction {
    return {
        type: GetIpActionTypes.REQUEST,
        payload,
    };
}

export function getIpSuccess(payload: GetIpSuccessPayload): GetIpSuccessAction {
    return {
        type: GetIpActionTypes.SUCCESS,
        payload,
    };
}
