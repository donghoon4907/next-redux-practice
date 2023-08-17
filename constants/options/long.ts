import type { CoreSelectOption } from '@interfaces/core';

// 납입주기
const L_PAYCYCLE: CoreSelectOption[] = [
    {
        label: '일시납',
        value: '일시납',
        isFixed: false,
    },
    {
        label: '월납',
        value: '월납',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3월납',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6월납',
        isFixed: false,
    },
    {
        label: '연납',
        value: '연납',
        isFixed: false,
    },
];
// 납입기간
const L_PAYDU: CoreSelectOption[] = [
    {
        label: '1년',
        value: '1년',
        isFixed: false,
    },
    {
        label: '5년',
        value: '5년',
        isFixed: false,
    },
    {
        label: '10년',
        value: '10년',
        isFixed: false,
    },
    {
        label: '20년',
        value: '20년',
        isFixed: false,
    },
    {
        label: '30년',
        value: '30년',
        isFixed: false,
    },
    {
        label: '종신',
        value: '종신',
        isFixed: false,
    },
];

// 계약 상태
export const L_STATUS: CoreSelectOption[] = [
    {
        label: '정상유지',
        value: '정상유지',
        isFixed: false,
    },
    {
        label: '계약철회',
        value: '계약철회',
        isFixed: false,
    },
    {
        label: '품보해지',
        value: '품보해지',
        isFixed: false,
    },
    {
        label: '민원해지',
        value: '민원해지',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];

// 수금 상태
export const L_PSTATUS: CoreSelectOption[] = [
    {
        label: '납입중',
        value: '납입중',
        isFixed: false,
    },
    {
        label: '납입유예',
        value: '납입유예',
        isFixed: false,
    },
    {
        label: '납입면제',
        value: '납입면제',
        isFixed: false,
    },
    {
        label: '납입완료',
        value: '납입완료',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];

const rootSelectOptions = {
    payCycle: L_PAYCYCLE,
    payDu: L_PAYDU,
    status: L_STATUS,
    pStatus: L_PSTATUS,
};

export default rootSelectOptions;
