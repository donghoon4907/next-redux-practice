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
     * 입금구분
     */
    dist: string;
    /**
     * 대상년월
     */
    // gdate?: string;
    /**
     * 입금구분
     */
    // distkind?: string;
    /**
     * 수금실적
     */
    pay: number;
    /**
     * 책임(only 자동차계약)
     */
    pay1?: number;
    /**
     * 책임(only 자동차계약)
     */
    pay2?: number;
    /**
     * 금종
     */
    method?: string;
    /**
     * 납입주기
     */
    cycle?: string;
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
