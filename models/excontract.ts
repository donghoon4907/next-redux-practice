import { CoreDeleteableObject } from './core';

export type Excontract = CoreDeleteableObject & {
    idx?: number;
    spe: 'car' | 'gen' | 'long';
    /**
     * 보험사코드
     */
    wcode: number;
    /**
     * 보험사명
     */
    wname: string;
    /**
     * 상품명
     */
    title?: string;
    /**
     * 세부보종
     */
    subcategory?: string;
    /**
     * 보험료
     */
    pay?: number;
    /**
     * 계약일, 개시일
     */
    contdate?: string;
    /**
     * 비고
     */
    remark?: string;
    /**
     * 만기일자
     */
    bo_dateto?: string;
    /**
     * 차량번호
     */
    carnum?: string;
    /**
     * 만기안내여부
     */
    exp_notice?: boolean;
};
