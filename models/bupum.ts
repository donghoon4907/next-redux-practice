import type { CoreCheckableModel } from './core';
// 추가부속
export type Bupum = CoreCheckableModel & {
    idx?: number;
    /**
     * 부속명
     */
    name: string;
    /**
     * 부속가액
     */
    price: number;
};
