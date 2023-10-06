import type { CoreSelectOption } from '@interfaces/core';

// 사용자 검색 타입
const USER_SEARCH_TYPES: CoreSelectOption[] = [
    {
        label: '사원번호',
        value: 'userid',
    },
    {
        label: '영업가족명',
        value: 'fc',
    },
];

const rootSelectOptions = {
    userSearchTypes: USER_SEARCH_TYPES,
};

export default rootSelectOptions;
