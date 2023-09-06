import type { CoreSelectOption } from '@interfaces/core';

// 페이지네이션 - 보기수
const LIST_COUNTS: CoreSelectOption[] = [
    {
        label: '25개 보기',
        value: '25',
    },
    {
        label: '50개 보기',
        value: '50',
    },
    {
        label: '100개 보기',
        value: '100',
    },
    {
        label: '500개 보기',
        value: '500',
    },
];

const rootSelectOptions = {
    listCounts: LIST_COUNTS,
};

export default rootSelectOptions;
