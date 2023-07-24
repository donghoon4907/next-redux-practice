import type { CoreSelectOption } from '@interfaces/core';

// 사업부 상세 - 지점현황
export const POINT_STATUS: CoreSelectOption[] = [
    {
        label: '운영중',
        value: '01',
        isFixed: false,
    },
    {
        label: '폐점',
        value: '02',
        isFixed: false,
    },
];
