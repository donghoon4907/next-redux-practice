import type { CoreFilterOption } from '@interfaces/core';

export const X_SEARCH_FILTERS: CoreFilterOption[] = [
    { id: 'filter1', type: 'checkbox', label: '개인', value: 'individuals' },
    { id: 'filter2', type: 'checkbox', label: '법인', value: 'corporations' },
    { id: 'filter3', type: 'checkbox', label: '남', value: 'man' },
    { id: 'filter4', type: 'checkbox', label: '여', value: 'woman' },
    {
        id: 'filter5',
        type: 'checkbox',
        label: '개인정보활용 동의',
        value: 'consent',
    },
    { id: 'filter5', type: 'checkbox', label: '미동의', value: 'non-consent' },
];

export const X_SEARCH_WHERES = [
    [
        {
            id: 'test1-1',
            type: 'select',
            width: 440,
            order: 1,
            label: '본부',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test1-2',
            type: 'select',
            width: 200,
            order: 2,
            label: '지점',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
    ],
    [
        {
            id: 'test2-1',
            type: 'select',
            width: 200,
            order: 1,
            label: '입금구분',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test2-2',
            type: 'select',
            width: 200,
            order: 2,
            label: '도입경로',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test2-3',
            type: 'select',
            width: 200,
            order: 1,
            label: '상품비교',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test2-4',
            type: 'select',
            width: 200,
            order: 2,
            label: '자필서명',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
    ],
    [
        {
            id: 'test3-1',
            type: 'select',
            width: 200,
            order: 1,
            label: '보험사',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test3-2',
            type: 'select',
            width: 200,
            order: 2,
            label: '상품종목',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test3-3',
            type: 'select',
            width: 200,
            order: 3,
            label: '등급',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test3-4',
            type: 'select',
            width: 200,
            order: 4,
            label: '인수구분',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
    ],
    [
        {
            id: 'test4-1',
            type: 'select',
            width: 300,
            order: 1,
            label: '조직',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
        {
            id: 'test4-2',
            type: 'select',
            width: 300,
            order: 2,
            label: '조직',
            items: [
                {
                    label: 'AM영업',
                    value: 'am',
                },
            ],
        },
    ],
];
