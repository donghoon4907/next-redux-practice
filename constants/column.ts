import type { CoreColumnOption } from '@interfaces/core';

export const LONG_STATE_HISTORY: CoreColumnOption = {
    stdate: '상태발생일',
    type: '상태구분',
    status: '계약상태',
    whoi: '회차',
    remark: '내용',
    confirm: '확정',
    insert: '입력',
};

export const LONG_CHANGE_HISTORY: CoreColumnOption = {
    type: '구분',
    remark: '내용',
    body: '변경사항',
    insert: '일시',
};
