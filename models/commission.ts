import type { CoreDeleteableObject } from './core';

/**
 * 수수료 설정
 */
export type Commission = CoreDeleteableObject & {
    idx?: number;
    sMonth: string;
    eMonth: string;
    rule: string;
};
