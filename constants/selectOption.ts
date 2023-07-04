import type { CoreSelectOption } from '@interfaces/core';

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

export const BIRTH_TYPE: CoreSelectOption[] = [
    {
        label: '양력',
        value: 'Y',
        isFixed: false,
    },
    {
        label: '음력',
        value: 'N',
        isFixed: false,
    },
];

export const MOBILE_COM: CoreSelectOption[] = [
    {
        label: 'SKT',
        value: 'SKT',
        isFixed: false,
    },
    {
        label: 'KT',
        value: 'KT',
        isFixed: false,
    },
    {
        label: 'LGU',
        value: 'LGU',
        isFixed: false,
    },
    {
        label: 'KT알뜰폰',
        value: 'KT알뜰폰',
        isFixed: false,
    },
    {
        label: 'LGU알뜰폰',
        value: 'LGU알뜰폰',
        isFixed: false,
    },
];

export const EMAIL_COM: CoreSelectOption[] = [
    {
        label: 'naver.com',
        value: 'naver.com',
        isFixed: false,
    },
    {
        label: 'gmail.com',
        value: 'gmail.com',
        isFixed: false,
    },
    {
        label: 'kakao.com',
        value: 'kakao.com',
        isFixed: false,
    },
    {
        label: 'daum.net',
        value: 'daum.net',
        isFixed: false,
    },
];
// 영업 가족 목록
export const USER_TYPE: CoreSelectOption[] = [
    {
        label: 'FRC',
        value: 'FRC',
        isFixed: false,
    },
    {
        label: '파트너',
        value: '파트너',
        isFixed: false,
    },
    {
        label: 'STAFF',
        value: 'STAFF',
        isFixed: false,
    },
];

// 재직 현황 목록
export const EMP_STATUS: CoreSelectOption[] = [
    {
        label: '상근',
        value: '상근',
        isFixed: false,
    },
    {
        label: '비상근',
        value: '비상근',
        isFixed: false,
    },
    {
        label: '퇴사',
        value: '퇴사',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];
