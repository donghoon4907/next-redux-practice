import { CoreCheckableModel } from './core';

export type Family = CoreCheckableModel & {
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
