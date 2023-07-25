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
        label: '내선번호',
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
        label: '내선번호',
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

// 소득설정 탭 - 산출기준
export const CALC_STANDARD: CoreSelectOption[] = [
    {
        label: '기본+성과',
        value: '01',
        isFixed: false,
    },
    {
        label: '기본',
        value: '02',
        isFixed: false,
    },
    {
        label: '성과',
        value: '03',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 보증구분
export const GUARANTEE_DIVISION: CoreSelectOption[] = [
    {
        label: '이행보증',
        value: '01',
        isFixed: false,
    },
    {
        label: '신원보증',
        value: '02',
        isFixed: false,
    },
    {
        label: '질권설정',
        value: '03',
        isFixed: false,
    },
    {
        label: '공증',
        value: '04',
        isFixed: false,
    },
    {
        label: '적립금',
        value: '05',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 상태
export const GUARANTEE_STATUS: CoreSelectOption[] = [
    {
        label: '적립중',
        value: '01',
        isFixed: false,
    },
    {
        label: '적립완료',
        value: '02',
        isFixed: false,
    },
    {
        label: '일시중단',
        value: '03',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 산출기준
export const C_STANDARD: CoreSelectOption[] = [
    {
        label: '소득전체',
        value: '01',
        isFixed: false,
    },
    {
        label: '건별수수료(전체)',
        value: '02',
        isFixed: false,
    },
    {
        label: '건별수수료(장기)',
        value: '03',
        isFixed: false,
    },
];
