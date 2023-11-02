import type { CoreCheckableModel } from './core';
// 납입 실적 모델
export type KeyValue = CoreCheckableModel & {
    /**
     * label
     */
    key?: string;
    /**
     * value
     */
    val?: string;
};
