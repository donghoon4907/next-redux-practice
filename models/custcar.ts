import type { CoreCheckableModel } from './core';

export type Custcar = CoreCheckableModel & {
    idx?: number;
    p_type: 'car' | 'gen';
    /**
     * 차량번호
     */
    carnum?: string;
    /**
     * 차량정보
     */
    carname?: string;
    /**
     * 차명코드
     */
    carcode?: string;
    /**
     * 보험만기일
     */
    bo_dateto?: string;
    /**
     * 만기안내여부
     */
    exp_notice?: boolean;
    /**
     * 비고
     */
    remark?: string;
    /**
     * 피담보물
     */
    p_title?: string;
    /**
     * 소재지번
     */
    p_address?: string;
};
