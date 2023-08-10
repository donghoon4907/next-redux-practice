import { CoreDeleteableObject } from './core';

export type Family = CoreDeleteableObject & {
    // id
    idx?: number;
    name?: string;
    type: string;
    relation?: string;
    birthday?: string;
    birth_type?: boolean;
    sex: string;
    remark?: string;
};
