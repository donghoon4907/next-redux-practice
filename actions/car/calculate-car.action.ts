import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const CALCULATE_CAR_KEY = 'CALCULATE_CAR';

export const CalculateCarActionTypes = {
    REQUEST: `${CALCULATE_CAR_KEY}_REQUEST`,
    SUCCESS: `${CALCULATE_CAR_KEY}_SUCCESS`,
    FAILURE: `${CALCULATE_CAR_KEY}_FAILURE`,
} as const;

export interface CalculateCarRequestPayload extends CorePayload {
    // 주민번호 or 사업자번호
    jumin: string;
    // 가입예정일
    idate: string;
    // 차량용도
    caruse: string;
    // 가족한정
    carfamily: string;
    // 연령한정
    carage: string;
    // 대인배상2
    dambo2: string;
    // 대물배상
    dambo3: string;
    // 자기신체사고
    dambo4: string;
    // 무보험차상해
    dambo5: string;
    // 자기차량손해
    dambo6: string;
    // 무보험차차량손해
    dambo7: string;
    // 긴급출동 서비스
    goout1: string;
    // 긴급출동세부
    goout_dist: string;
    // 스포츠카
    sportcar: string;
    // 차량코드
    carcode: string;
    // 차량년식
    caryear: string;
    // 차량등록일
    cardate: string;
    // 보험가입경력
    guipcarrer: string;
    // 보험가입경력_차량
    guipcarrer_car: string;
    // 교통법규위반
    traffic: string;
    // 할인할증율
    halin: string;
    // 특별할증율 - 기본할증
    special_code: string;
    // 3년간사고요율
    ss_sago3: string;
    // 특별할증율 - 추가할증
    special_code2: string;
    // 요청 url
    ret_url: string;
    // 업체코드
    com_name: string;
}

export interface CalculateCarRequestAction extends Action<string> {
    payload: CalculateCarRequestPayload;
}

export interface CalculateCarSuccessAction extends Action<string> {}

export function calculateCarRequest(
    payload: CalculateCarRequestPayload,
): CalculateCarRequestAction {
    return {
        type: CalculateCarActionTypes.REQUEST,
        payload,
    };
}

export function calculateCarSuccess(): CalculateCarSuccessAction {
    return {
        type: CalculateCarActionTypes.SUCCESS,
    };
}
