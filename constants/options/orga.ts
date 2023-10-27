import type { CoreSelectOption } from '@interfaces/core';

// 조직등급
const GRADE: CoreSelectOption[] = [
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

const GRADE2: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    {
        label: '회사',
        value: '1',
        isFixed: false,
    },
    ...GRADE,
];

// 현상태
const STATUS: CoreSelectOption[] = [
    {
        label: '운영중',
        value: '운영중',
        isFixed: false,
    },
    {
        label: '폐점',
        value: '폐점',
        isFixed: false,
    },
];

const STATUS2: CoreSelectOption[] = [
    {
        label: '전체',
        value: '',
        isFixed: false,
    },
    ...STATUS,
];

const rootSelectOptions = {
    grade: GRADE,
    grade2: GRADE2,
    status: STATUS,
    status2: STATUS2,
};

export default rootSelectOptions;
