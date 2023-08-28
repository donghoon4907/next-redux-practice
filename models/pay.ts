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
    whoi?: number;
    /**
     * 납입구분
     */
    dist: string;
    /**
     * 대상년월
     */
    gdate?: string;
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
    method?: string;
    /**
     * 납입주기
     */
    cycle?: number;
    /**
     * 실적확인
     */
    confirm?: 'Y' | 'N' | boolean;
    /**
     * 정산여부
     */
    cals?: boolean;
    /**
     * 입력
     */
    insert_userid?: string;
    insert_datetime?: string;
};
