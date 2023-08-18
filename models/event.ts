import type { CoreCheckableModel } from './core';

export type Event = CoreCheckableModel & {
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
