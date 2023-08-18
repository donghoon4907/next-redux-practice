import type { CoreCheckableModel } from './core';
// 배서 모델
export type Endorsement = CoreCheckableModel & {
    idx?: number;
    /**
     * 회차
     */
    whoi: number;
    /**
     * 구분
     */
    dist: string;
    /**
     * 발생일
     */
    paydate?: string;
    /**
     * 업적월
     */
    gdate?: string;
    /**
     * 실적보험료 전
     */
    pay_before: number;
    /**
     * 실적보험료 후
     */
    pay_after: number;
    /**
     * 수정보험료 전
     */
    tp_before: number;
    /**
     * 수정보험료 후
     */
    tp_after: number;
    /**
     * 수정보험료 차액
     */
    balance: number;
    /**
     * 실적확인
     */
    confirm?: 'Y' | 'N';
    /**
     * 정산여부
     */
    cals?: boolean;
    /**
     * 입력
     */
    insert?: string;
};
