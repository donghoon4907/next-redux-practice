import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const GET_CAR_COMPANIES_KEY = 'GET_CAR_COMPANIES';

export const GetCarCompaniesActionTypes = {
    REQUEST: `${GET_CAR_COMPANIES_KEY}_REQUEST`,
    SUCCESS: `${GET_CAR_COMPANIES_KEY}_SUCCESS`,
    FAILURE: `${GET_CAR_COMPANIES_KEY}_FAILURE`,
    CLEAR: `${GET_CAR_COMPANIES_KEY}_CLEAR`,
} as const;

export interface GetCarCompaniesRequestPayload extends CorePayload {
    type:
        | 'companies'
        | 'company-cars'
        | 'car-years'
        | 'car-series'
        | 'car-options';
    // 보험개시년
    year: string;
    // 보험개시분기
    quater: string;
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

export interface GetCarCompaniesSuccessPayload
    extends Pick<GetCarCompaniesRequestPayload, 'type'> {
    data: Record<string, any>;
}

export interface ClearCarCompaniesPayload
    extends Pick<GetCarCompaniesRequestPayload, 'type'> {}

export interface GetCarCompaniesRequestAction extends Action<string> {
    payload: GetCarCompaniesRequestPayload;
}

export interface GetCarCompaniesSuccessAction extends Action<string> {
    payload: GetCarCompaniesSuccessPayload;
}

export interface ClearCarCompaniesAction extends Action<string> {
    payload: ClearCarCompaniesPayload;
}

export function getCarCompaniesRequest(
    payload: GetCarCompaniesRequestPayload,
): GetCarCompaniesRequestAction {
    return {
        type: GetCarCompaniesActionTypes.REQUEST,
        payload,
    };
}

export function getCarCompaniesSuccess(
    payload: GetCarCompaniesSuccessPayload,
): GetCarCompaniesSuccessAction {
    return {
        type: GetCarCompaniesActionTypes.SUCCESS,
        payload,
    };
}

export function clearCarCompanies(
    payload: ClearCarCompaniesPayload,
): ClearCarCompaniesAction {
    return {
        type: GetCarCompaniesActionTypes.CLEAR,
        payload,
    };
}
