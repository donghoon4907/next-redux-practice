import type { CoreCheckableModel } from './core';

export type UserHistory = CoreCheckableModel & {
    userid: string;
    // name?: string;
    username?: string;
    department?: string;
    insert_userid?: string;
    insert_date?: string;
    // 비고
    remark?: string;
    // 기준일
    gdate?: string;
    // 구분
    // dist?: string;
    // 지점
    group?: string;
    // 사용인코드
    fccode?: string;
};
