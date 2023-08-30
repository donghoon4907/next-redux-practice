import { CoreCheckableModel } from './core';

export type Insured = CoreCheckableModel & {
    // id
    // idx?: number;
    // 피보험자 / 피보험물
    dist: string;
    // 고객 id
    p_idx?: number;
    name?: string;
    tel?: string;
    job?: string;
    birthday?: string;
    sex?: string;
    p_address?: string;
    // 주 피보험자 여부
    isMain?: boolean;
    // 관계
    relation?: string;
};
