import type { CoreCheckableModel } from './core';
/** 규정 유형 */
type RuleType = 'table' | 'prop';

/**
 * 규정
 */
export type Rule = CoreCheckableModel & {
    idx?: number;
    wcode?: string;
    rule_type?: RuleType;
    sudists?: string;
    cal_spec?: string;
    cal_base?: string;
    swhoi?: string;
    ewhoi?: string;
    rate?: string;
};
