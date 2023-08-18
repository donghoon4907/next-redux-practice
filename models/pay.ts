import type { CoreCheckableModel } from './core';
// 납입 실적 모델
export type Pay = CoreCheckableModel & {
    idx?: number;
    /**
     * 영수일
     */
    paydate: string;
    /**
     * 회차
     */
    whoi: number;
    /**
     * 납입구분
     */
    dist: string;
    /**
     * 대상년월
     */
    hmonth?: string;
    /**
     * 입금구분
     */
    distkind?: string;
    /**
     * 수금실적
     */
    pay: number;
    /**
     * 금종
     */
    paykind?: string;
    /**
     * 납입주기
     */
    cycle: string;
    /**
     * 실적확인
     */
    confirm?: 'Y' | 'N';
    /**
     * 정산여부
     */
    // cals: string;
    /**
     * 입력
     */
    insert?: string;
};
