import type { CoreSelectOption } from '@interfaces/core';

// 납입구분
const L_PAY_DIST: CoreSelectOption[] = [
    {
        label: '정상',
        value: '정상',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
];

const rootSelectOptions = {
    payDist: L_PAY_DIST,
};

export default rootSelectOptions;
