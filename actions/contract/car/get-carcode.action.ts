import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { RequestCarcodeType } from '@models/car';

export const GET_CAR_CODE_KEY = 'GET_CAR_CODE';

export const GetCarcodeActionTypes = {
    REQUEST: `${GET_CAR_CODE_KEY}_REQUEST`,
    SUCCESS: `${GET_CAR_CODE_KEY}_SUCCESS`,
    FAILURE: `${GET_CAR_CODE_KEY}_FAILURE`,
    CLEAR: `${GET_CAR_CODE_KEY}_CLEAR`,
} as const;

export interface GetCarcodeRequestPayload extends CorePayload {
    type: RequestCarcodeType;
    // 보험개시일
    idate: string;
    params?: {
        // 제조사
        carbrand?: string;
        // 모델명
        carname?: string;
        // 연식
        caryear?: string;
        // 세부차명
        carsub?: string;
        // 차명코드
        carcode?: string;
    };
}

export interface GetCarcodeSuccessPayload
    extends Pick<GetCarcodeRequestPayload, 'type'> {
    idate?: string;
    data: Record<string, any>;
}

export interface ClearCarcodePayload {
    type: RequestCarcodeType;
}

export interface GetCarcodeRequestAction extends Action<string> {
    payload: GetCarcodeRequestPayload;
}

export interface GetCarcodeSuccessAction extends Action<string> {
    payload: GetCarcodeSuccessPayload;
}

export interface ClearCarcodeAction extends Action<string> {
    payload: ClearCarcodePayload;
}

export function getCarcodeRequest(
    payload: GetCarcodeRequestPayload,
): GetCarcodeRequestAction {
    return {
        type: GetCarcodeActionTypes.REQUEST,
        payload,
    };
}

export function getCarcodeSuccess(
    payload: GetCarcodeSuccessPayload,
): GetCarcodeSuccessAction {
    return {
        type: GetCarcodeActionTypes.SUCCESS,
        payload,
    };
}

export function clearCarcode(payload: ClearCarcodePayload): ClearCarcodeAction {
    return {
        type: GetCarcodeActionTypes.CLEAR,
        payload,
    };
}
