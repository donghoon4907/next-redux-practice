import type { Action } from 'redux';
import type { Pay } from '@models/pay';
import type { CorePayload } from '@interfaces/core';
import type { Insured } from '@models/insured';
import type { Bupum } from '@models/bupum';
// import type { Contact } from '@models/contact';

export const CREATE_CAR_KEY = 'CREATE_CAR';

export const CreateCarActionTypes = {
    REQUEST: `${CREATE_CAR_KEY}_REQUEST`,
    SUCCESS: `${CREATE_CAR_KEY}_SUCCESS`,
    FAILURE: `${CREATE_CAR_KEY}_FAILURE`,
} as const;

export interface CreateCarRequestPayload extends CorePayload {
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
    // 보장시기
    bo_datefrom: string;
    // 보장만기일
    bo_dateto: string;
    // 보장기간
    bo_desc?: string;
    // 인수구분
    insu?: string;
    // 등급
    rate?: string;
    // 보험료
    payment: number;
    // 납입방법
    cycle?: string;
    // 전보험사
    pre_wcode?: number;
    // 전계약번호
    pre_cnum?: string;
    // 계약자 ID
    c_idx?: number;
    // 계약자 이름
    c_name?: string;
    // 피보험자 목록
    p_persons: Insured[];
    // 납입실적 목록
    pays?: Pay[];
    // 비교견적정보
    carinfo: {
        // 차량번호
        carnum?: string;
        // 차량연식
        caryear?: string;
        // 차명코드
        carcode?: string;
        // 차량등록일
        cardate?: string;
        // LPG 여부
        lpg?: boolean;
        // 탑차 여부
        topcar?: boolean;
        // 스포츠카 여부
        sportcar?: boolean;
        // 차량명
        carname?: string;
        // 차량등급
        car_grade?: string;
        // 배기량
        baegirang?: number;
        // 인원
        people_num?: number;
        // 오토 여부
        auto?: boolean;
        // ABS 여부
        abs_halin?: boolean;
        // 이모빌라이저 여부
        imo?: boolean;
        // 블랙박스 설정
        blackbox?: {
            buydate?: string;
            buyprice?: number;
        };
        // 에어백
        aircode?: number;
        // 전방출동
        chung?: string;
        // 차선이탈
        gps?: string;
        // 커넥티드카 여부
        blue_link?: boolean;
        // 지능형 안전장치 여부
        l_jobcode_nm?: boolean;
        // 추가부속 목록
        bupum?: Bupum[];
        // 차량구매형태
        membercode?: string;
        // 기본차량가액
        carprice?: number;
        // 부속가액합계
        bupum_price?: number;
        // 총 차량가액
        car_tot?: number;
        // 유상운송
        usang?: string;
        // 기중기장치요율
        usnag2?: number;
    };
    // 세부담보설정, 특약사항
    dambo: {
        // 대인배상 1
        dambo1: string;
        // 대인배상 2
        dambo2?: string;
        // 대물한도
        dambo3?: string;
        // 자손/자상
        dambo4?: string;
        // 무보험차
        dambo5?: string;
        // 자기차량
        dambo6?: string;
        // 긴급출동
        goout?: {
            // 기본
            dist?: string;
            // 상세
            detail?: string;
        };
        // 물적사고할증
        mul_sago?: string;
        // 마일리지
        mile?: {
            dist?: string;
            detail?: string;
        };
        // 안전운전습관
        tmap?: {
            dist?: string;
            detail?: string;
        };
        // 차량용도
        caeruse?: string;
        // 일부담보
        il_price?: number;
    };
    // 요율사항
    insurate: {
        // 총차량대수
        childdrive?: string;
        // 보험가입경력 - 피보험자
        guipcarrer?: string;
        // 보험가입경력 - 차량
        guipcarrer_car?: string;
        // 직전3년가입경력 - DB
        l_jobcode?: string;
        // 직전3년가입경력 - KB
        guip_carrer_kb?: string;
        // 교통법규위반
        traffic?: {
            dist?: string;
            // 건수
            detail?: string;
        };
        // 할증율 - 할인할증
        halin?: string;
        // 할증율 - 군/법인/해외경력인정
        rate_u?: boolean;
        // 기본할증
        special_code?: string;
        // 추가할증
        special_code2?: string;
        // 사고요율 - 3년간사고요율
        ss_sago3?: string;
        // 사고요율 - 전계약사고요율
        pre_sago3?: string;
        // 사고요율 - 3년사고점수
        p_sago?: string;
        // 사고요율 - 1년사고점수
        goout2?: string;
        // 피보기준 사고건수
        sago3?: number;
        car_nonum?: number;
        sago1?: number;
        // 차량기준 사고건수
        car_sago3?: number;
        car_sago2?: number;
        car_sago1?: number;
    };
}

export interface CreateCarRequestAction extends Action<string> {
    payload: CreateCarRequestPayload;
}

export interface CreateCarSuccessAction extends Action<string> {}

export function createCarRequest(
    payload: CreateCarRequestPayload,
): CreateCarRequestAction {
    return {
        type: CreateCarActionTypes.REQUEST,
        payload,
    };
}

export function createCarSuccess(): CreateCarSuccessAction {
    return {
        type: CreateCarActionTypes.SUCCESS,
    };
}
