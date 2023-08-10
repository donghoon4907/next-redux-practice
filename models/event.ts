import { CoreDeleteableObject } from './core';

export type Event = CoreDeleteableObject & {
    // id
    idx?: number;
    name?: string;
    type_who?: string;
    title?: string;
    description?: string;
    eventdate?: string;
    d_type?: boolean;
    notice?: string;
    remark?: string;
};
