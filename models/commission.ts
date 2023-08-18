import type { CoreCheckableModel } from './core';

/**
 * 수수료 설정
 */
export type Commission = CoreCheckableModel & {
    idx?: number;
    sMonth: string;
    eMonth: string;
    rule: string;
};
