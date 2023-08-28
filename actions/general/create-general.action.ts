import type { Action } from 'redux';
import type { Pay } from '@models/pay';
import type { CorePayload } from '@interfaces/core';
import type { Insured } from '@models/insured';
import type { Contact } from '@models/contact';

export const CREATE_GENERAL_KEY = 'CREATE_GENERAL';

export const CreateGeneralActionTypes = {
    REQUEST: `${CREATE_GENERAL_KEY}_REQUEST`,
    SUCCESS: `${CREATE_GENERAL_KEY}_SUCCESS`,
    FAILURE: `${CREATE_GENERAL_KEY}_FAILURE`,
} as const;

export interface CreateGeneralRequestPayload extends CorePayload {
    // 담당자 ID
    userid: string;
    // 보험사 코드
    wcode: number;
    // 계약번호
    cnum: string;
    // 상품코드
    p_code: string;
    // 상품명
    title: string;
    // 보종
    spec: string;
    // 세부보종
    // subcategory: string | null;
    // 계약일자
    contdate: string;
    // 보장시기
    bo_datefrom: string;
    // 보장만기일
    bo_dateto?: string;
    // 계약상태
    status?: string;
    // 실적보험료
    payment: number;
    // 계약자 ID
    c_idx?: number;
    // 계약자 이름
    c_name?: string;
    // 피보험자 목록
    p_persions?: Insured[];
    // 납입실적 목록
    pays?: Pay[];
    // 접촉이력
    contacts?: Contact[];
}

export interface CreateGeneralRequestAction extends Action<string> {
    payload: CreateGeneralRequestPayload;
}

export interface CreateGeneralSuccessAction extends Action<string> {}

export function createGeneralRequest(
    payload: CreateGeneralRequestPayload,
): CreateGeneralRequestAction {
    return {
        type: CreateGeneralActionTypes.REQUEST,
        payload,
    };
}

export function createGeneralSuccess(): CreateGeneralSuccessAction {
    return {
        type: CreateGeneralActionTypes.SUCCESS,
    };
}
