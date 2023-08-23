import { CoreCheckableModel } from './core';

export type InsuredPerson = CoreCheckableModel & {
    // id
    idx?: number;
    // 미사용
    dist?: string;
    // 고객 id
    p_idx?: number;
    name?: string;
    tel?: string;
    job?: string;
    birthday?: string;
    sex?: string;
};
