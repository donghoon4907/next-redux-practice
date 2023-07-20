import type { CoreSelectOption } from '@interfaces/core';

// 비교견적 설정 - 회사명
export const ESTIMATE_COMP: CoreSelectOption[] = [
    {
        label: '회사명',
        value: '01',
        isFixed: false,
    },
    {
        label: '지점명',
        value: '02',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '03',
        isFixed: false,
    },
];

// 비교견적 설정 - 영업명
export const ESTIMATE_SALES: CoreSelectOption[] = [
    {
        label: '본인이름',
        value: '01',
        isFixed: false,
    },
    {
        label: '지점명',
        value: '02',
        isFixed: false,
    },
    {
        label: '표기안함',
        value: '03',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '04',
        isFixed: false,
    },
];

// 비교견적 설정 - 대표전화
export const ESTIMATE_PHONE: CoreSelectOption[] = [
    {
        label: '회사전화',
        value: '01',
        isFixed: false,
    },
    {
        label: '지점전화',
        value: '02',
        isFixed: false,
    },
    {
        label: '핸드폰',
        value: '03',
        isFixed: false,
    },
    {
        label: '본인전화',
        value: '04',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '05',
        isFixed: false,
    },
];

// 비교견적 설정 - 팩스번호
export const ESTIMATE_FAX: CoreSelectOption[] = [
    {
        label: '지점팩스',
        value: '01',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '02',
        isFixed: false,
    },
];

// 비교견적 설정 - 직통전화
export const ESTIMATE_DIRECT: CoreSelectOption[] = [
    {
        label: '회사전화',
        value: '01',
        isFixed: false,
    },
    {
        label: '핸드폰',
        value: '02',
        isFixed: false,
    },
    {
        label: '본인전화',
        value: '03',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '04',
        isFixed: false,
    },
];

// 비교견적 설정 - 표기주소
export const ESTIMATE_ADDRESS: CoreSelectOption[] = [
    {
        label: '회사주소',
        value: '01',
        isFixed: false,
    },
    {
        label: '지점주소',
        value: '02',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '03',
        isFixed: false,
    },
];
