import type { CoreSelectOption } from '@interfaces/core';
// 리스트 보기 수
export const SHOW_COUNTS: CoreSelectOption[] = [
    {
        label: '25줄보기',
        value: '25',
        isFixed: false,
    },
    {
        label: '50줄보기',
        value: '50',
        isFixed: false,
    },
    {
        label: '100줄보기',
        value: '100',
        isFixed: false,
    },
    {
        label: '500줄보기',
        value: '500',
        isFixed: false,
    },
];
// 회차
export const ROUNDS: CoreSelectOption[] = [
    {
        label: '전체',
        value: '1,999',
        isFixed: false,
    },
    {
        label: '초회',
        value: '1,1',
        isFixed: false,
    },
    {
        label: '초년도',
        value: '1,12',
        isFixed: false,
    },
    {
        label: '2차년도이상',
        value: '13,999',
        isFixed: false,
    },
];
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

// 보종 목록
export const PRODUCT_TYPE: CoreSelectOption[] = [
    {
        label: '인보장',
        value: '인보장',
        isFixed: false,
    },
    {
        label: '재물',
        value: '재물',
        isFixed: false,
    },
    {
        label: '연저축',
        value: '연저축',
        isFixed: false,
    },
    // {
    //     label: '결산',
    //     value: '결산',
    //     isFixed: false,
    // },
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
