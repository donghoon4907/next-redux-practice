import { CoreDeleteableObject } from './core';

export type Contact = CoreDeleteableObject & {
    // id
    idx?: number;
    kind: string;
    channel: string;
    spe: string;
    spe_label: string;
    cnum?: string;
    issuedate?: string;
    replydatetime?: string;
    status?: string;
    comment: string;
    insert_username: string;
    insert_userid: string;
    insert_datetime?: string;
};
