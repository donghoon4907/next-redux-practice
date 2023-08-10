import type { CoreSelectOption } from '@interfaces/core';

// 고객구분
const C_DIVISION: CoreSelectOption[] = [
    {
        label: '개인',
        value: '0',
        isFixed: false,
    },
    {
        label: '법인',
        value: '1',
        isFixed: false,
    },
];
// 나이
const C_AGE: CoreSelectOption[] = [
    {
        label: '만나이',
        value: '만나이',
        isFixed: false,
    },
    {
        label: '보험나이',
        value: '보험나이',
        isFixed: false,
    },
    {
        label: '일반나이',
        value: '일반나이',
        isFixed: false,
    },
];
// 고객등급
const C_GRADE: CoreSelectOption[] = [
    {
        label: 'A',
        value: 'A',
        isFixed: false,
    },
    {
        label: 'B',
        value: 'B',
        isFixed: false,
    },
    {
        label: 'C',
        value: 'C',
        isFixed: false,
    },
    {
        label: 'D',
        value: 'D',
        isFixed: false,
    },
    {
        label: 'E',
        value: 'E',
        isFixed: false,
    },
];
// 유입경로
const INFLOW_PATH: CoreSelectOption[] = [
    {
        label: '모집',
        value: '모집',
        isFixed: false,
    },
    {
        label: '퇴사자DB',
        value: '퇴사자DB',
        isFixed: false,
    },
    {
        label: '유입DB',
        value: '유입DB',
        isFixed: false,
    },
];
// 개인정보활용동의
const C_PIA: CoreSelectOption[] = [
    {
        label: '서면',
        value: '서면',
        isFixed: false,
    },
    {
        label: '모바일',
        value: '모바일',
        isFixed: false,
    },
    {
        label: 'NICE',
        value: 'NICE',
        isFixed: false,
    },
];
// 상담구분
const COUNSELING_DIVISION: CoreSelectOption[] = [
    {
        label: '계약',
        value: '계약',
        isFixed: false,
    },
    {
        label: '유지관리',
        value: '유지관리',
        isFixed: false,
    },
    {
        label: '배서',
        value: '배서',
        isFixed: false,
    },
    {
        label: '수납',
        value: '수납',
        isFixed: false,
    },
    {
        label: '사내이관',
        value: '사내이관',
        isFixed: false,
    },
    {
        label: '이관IN',
        value: '이관IN',
        isFixed: false,
    },
    {
        label: '이관OUT',
        value: '이관OUT',
        isFixed: false,
    },
];
// 채널
const C_CHANNEL: CoreSelectOption[] = [
    {
        label: '대면',
        value: '대면',
        isFixed: false,
    },
    {
        label: 'SMS',
        value: 'SMS',
        isFixed: false,
    },
    {
        label: '통화',
        value: '통화',
        isFixed: false,
    },
    {
        label: '알림톡',
        value: '알림톡',
        isFixed: false,
    },
    {
        label: '약속',
        value: '약속',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];
// 계약종목
const C_CATEGORY: CoreSelectOption[] = [
    {
        label: '장기',
        value: 'long',
        isFixed: false,
    },
    {
        label: '자동차',
        value: 'car',
        isFixed: false,
    },
    {
        label: '일반',
        value: 'gen',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];
// 진행상태
const C_STATUS: CoreSelectOption[] = [
    {
        label: '진행중',
        value: '진행중',
        isFixed: false,
    },
    {
        label: '종결',
        value: '종결',
        isFixed: false,
    },
];
// 관리여부
const C_NOTICE: CoreSelectOption[] = [
    {
        label: '자동 알림톡',
        value: '자동 알림톡',
        isFixed: false,
    },
    {
        label: '자동 SMS',
        value: '자동 SMS',
        isFixed: false,
    },
    {
        label: '무시',
        value: '무시',
        isFixed: false,
    },
    {
        label: '안내만',
        value: '안내만',
        isFixed: false,
    },
];

const rootSelectOptions = {
    division: C_DIVISION,
    age: C_AGE,
    grade: C_GRADE,
    inflowPath: INFLOW_PATH,
    pia: C_PIA,
    counselingDivision: COUNSELING_DIVISION,
    channel: C_CHANNEL,
    category: C_CATEGORY,
    status: C_STATUS,
    notice: C_NOTICE,
};

export default rootSelectOptions;
