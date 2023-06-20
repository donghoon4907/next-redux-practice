import type { CoreFilterOption, CoreSelectOption } from '@interfaces/core';

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

interface CoreSelectFilterOption {
    id: string;
    label: string;
    width: number;
    items: CoreSelectOption[];
    placeholder: string;
}

export const X_SEARCH_SELECTS: CoreSelectFilterOption[][] = [
    [
        {
            id: 'demo-search-filter-select1-1',
            label: '조직',
            width: 255,
            placeholder: '조직',
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
            id: 'demo-search-filter-select1-2',
            label: '영업가족',
            width: 255,
            placeholder: '영업가족',
            items: [
                {
                    label: '김동득 (W0412)',
                    value: 'w0412',
                },
            ],
        },
    ],
    [
        {
            id: 'demo-search-filter-select2-1',
            label: '지역',
            width: 120,
            placeholder: '지역',
            items: [
                {
                    label: '서울',
                    value: 'region_seoul',
                },
            ],
        },
        {
            id: 'demo-search-filter-select2-2',
            label: '유입경로',
            width: 120,
            placeholder: '유입경로',
            items: [
                {
                    label: '모집',
                    value: 'route_recruitment',
                },
            ],
        },
        {
            id: 'demo-search-filter-select2-3',
            label: '고객등급',
            width: 120,
            placeholder: '고객등급',
            items: [
                {
                    label: 'A',
                    value: 'grade_a',
                },
            ],
        },
    ],
    [
        {
            id: 'demo-search-filter-select3-1',
            label: '보험사',
            width: 200,
            placeholder: '보험사',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'demo-search-filter-select3-2',
            label: '상품종목',
            width: 200,
            placeholder: '상품종목',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'demo-search-filter-select3-3',
            label: '등급',
            width: 200,
            placeholder: '등급',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'demo-search-filter-select3-4',
            label: '인수구분',
            width: 200,
            placeholder: '인수구분',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
    ],
];
