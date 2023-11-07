import type { CoreCheckableModel } from './core';
// 미유지 부활 모델
export type Baeseo = CoreCheckableModel & {
    idx?: number;
    /**
     * 실적일
     */
    date?: string;
    /**
     * 구분
     */
    dist?: string;
    /**
     * 회차
     */
    whoi: number;
    /**
     * 실적
     */
    pay_point: number;
    /**
     * 수정보험료
     */
    tp_point: number;
    /**
     * 정산월
     */
    gdate?: string;
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
