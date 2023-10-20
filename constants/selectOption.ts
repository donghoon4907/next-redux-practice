import type { CoreSelectOption } from '@interfaces/core';

// 입금구분
export const DISTS: CoreSelectOption[] = [
    {
        label: '신규',
        value: '신규',
        isFixed: false,
    },
    {
        label: '계속',
        value: '계속',
        isFixed: false,
    },
    {
        label: '계속취소',
        value: '계속취소',
        isFixed: false,
    },
    {
        label: '철회',
        value: '철회',
        isFixed: false,
    },
    {
        label: '취소',
        value: '취소',
        isFixed: false,
    },
    {
        label: '실효',
        value: '실효',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
];

// 부서 목록(임시)
export const ORGA_RANK: CoreSelectOption[] = [
    {
        label: '회사',
        value: '1',
        isFixed: false,
    },
    {
        label: '본부',
        value: '2',
        isFixed: false,
    },
    {
        label: '지점',
        value: '3',
        isFixed: false,
    },
    {
        label: '팀',
        value: '4',
        isFixed: false,
    },
];
