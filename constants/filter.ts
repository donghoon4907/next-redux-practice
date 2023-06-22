import type {
    CoreFilterOption,
    CoreSelectFilterOption,
} from '@interfaces/core';

export const X_SEARCH_FILTERS: CoreFilterOption[][] = [
    [
        {
            id: 'filter1',
            type: 'checkbox',
            label: '개인',
            value: 'individuals',
        },
        {
            id: 'filter2',
            type: 'checkbox',
            label: '법인',
            value: 'corporations',
        },
    ],
    [
        { id: 'filter3', type: 'checkbox', label: '남', value: 'man' },
        { id: 'filter4', type: 'checkbox', label: '여', value: 'woman' },
    ],
    [
        {
            id: 'filter5',
            type: 'radio',
            label: '개인정보활용 동의',
            value: 'consent',
        },
        {
            id: 'filter6',
            type: 'radio',
            label: '미동의',
            value: 'non-consent',
        },
    ],
    [
        {
            id: 'filter7',
            type: 'checkbox',
            label: '장기',
            value: 'long',
        },
        {
            id: 'filter8',
            type: 'checkbox',
            label: '자동차',
            value: 'car',
        },
        {
            id: 'filter9',
            type: 'checkbox',
            label: '일반',
            value: 'normal',
        },
    ],
];

export const X_SEARCH_SELECTS: CoreSelectFilterOption[][] = [
    [
        // 1 row, 1part
        {
            id: 'sf-og',
            label: '조직',
            width: 345,
            colspan: 6,
            placeholder: '전체',
            items: [
                {
                    label: '회사전체',
                    value: 'all',
                },
                {
                    label: 'AM영업',
                    value: 'am_default',
                },
                {
                    label: 'AM영업 > 2강서지사',
                    value: 'am_gangseo',
                },
                {
                    label: 'AM영업 > 2경인지사',
                    value: 'am_geungin',
                },
            ],
        },
        {
            id: 'sf-f',
            label: '영업가족',
            width: 130,
            colspan: 3,
            placeholder: '전체',
            items: [
                {
                    label: '김동득 (W0412)',
                    value: 'w0412',
                },
            ],
        },
        {
            id: 'sf-lo',
            label: '지역',
            width: 130,
            colspan: 3,
            placeholder: '전체',
            items: [
                {
                    label: '서울',
                    value: 'region_seoul',
                },
            ],
        },
    ],
    // 1 row, 2 part
    [
        {
            id: 'sf-pa',
            label: '유입경로',
            width: 130,
            colspan: 3,
            placeholder: '전체',
            items: [
                {
                    label: '모집',
                    value: 'route_recruitment',
                },
            ],
        },
        {
            id: 'sf-g',
            label: '고객등급',
            width: 130,
            colspan: 3,
            placeholder: '전체',
            items: [
                {
                    label: 'A',
                    value: 'grade_a',
                },
            ],
        },
    ],
];
