import type { Action } from 'redux';
import type { Pay } from '@models/pay';
import type { CorePayload } from '@interfaces/core';
import { InsuredPerson } from '@models/insured-person';
import { Contact } from '@models/contact';

export const CREATE_LONG_KEY = 'CREATE_LONG';

export const CreateLongActionTypes = {
    REQUEST: `${CREATE_LONG_KEY}_REQUEST`,
    SUCCESS: `${CREATE_LONG_KEY}_SUCCESS`,
    FAILURE: `${CREATE_LONG_KEY}_FAILURE`,
} as const;

export interface CreateLongRequestPayload extends CorePayload {
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
    subcategory: string | null;
    // 정산보종
    cal_spec: string | null;
    // 계약일자
    contdate: string;
    // 납입주기
    pay_cycle: number;
    // 보장만기일
    bo_dateto?: string;
    // 보장만기년수
    bo_desc?: string;
    // 납입만기일
    pay_dateto: string;
    // 납입만기년수
    pay_du: number;
    // 계약상태
    status?: string;
    // 납입상태
    pay_status?: string;
    // 상태반영일
    status_date?: string;
    // 실적보험료
    payment: number;
    // 월납기준
    pay_month: number;
    // 보장보험료
    pay_bo?: number;
    // 적립보험료
    pay_j?: number;
    // 수정보험료
    tp?: number;
    // 1차수정
    tp1?: number;
    // 2차수정
    tp2?: number;
    // 3차수정
    tp3?: number;
    // 저축유지수정
    tpu?: number;
    // 정산구분
    cal_type?: string;
    // 정산개시월
    cal_datefrom?: string;
    // 본인계약여부
    family?: boolean;
    // 계약자 ID
    c_idx?: number;
    // 계약자 이름
    c_name?: string;
    // 피보험자 목록
    p_persions?: InsuredPerson[];
    // 납입실적 목록
    pays?: Pay[];
    // 접촉이력
    contacts?: Contact[];
}

export interface CreateLongRequestAction extends Action<string> {
    payload: CreateLongRequestPayload;
}

export interface CreateLongSuccessAction extends Action<string> {}

export function createLongRequest(
    payload: CreateLongRequestPayload,
): CreateLongRequestAction {
    return {
        type: CreateLongActionTypes.REQUEST,
        payload,
    };
}

export function createLongSuccess(): CreateLongSuccessAction {
    return {
        type: CreateLongActionTypes.SUCCESS,
    };
}
