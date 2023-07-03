import type { CoreMenuOption } from '@interfaces/core';

export const GNBS: CoreMenuOption[] = [
    { id: 'gnb1', level: 1, label: '고객', to: '#' },
    { id: 'gnb2', level: 1, label: '영업', to: '#' },
    { id: 'gnb3', level: 1, label: '계약', to: '/long-search' },
    { id: 'gnb4', level: 1, label: '소득', to: '#' },
    { id: 'gnb5', level: 1, label: '인사', to: '#' },
    // { id: 'gnb5', level: 1, label: 'Admin', to: '#' },
];

export const SUBMENUS: CoreMenuOption[] = [
    { id: 'submenu1', level: 1, label: '통합검색', to: '#' },
    { id: 'submenu2', level: 1, label: '게시판', to: '#' },
    { id: 'submenu3', level: 1, label: '일정관리', to: '#' },
    { id: 'submenu3', level: 1, label: 'SMS/Fax', to: '#' },
    { id: 'submenu3', level: 1, label: 'Mypage', to: '#' },
];

export const ASIDE_MENU_CUSTOMER: CoreMenuOption[] = [
    {
        id: 'aside_menu_customer1',
        level: 1,
        label: '가입고객',
        to: '',
        items: [],
    },
    {
        id: 'aside_menu_customer2',
        level: 1,
        label: '미가입고객',
        to: '',
        items: [],
    },
    {
        id: 'aside_menu_customer3',
        level: 1,
        label: '유입고객',
        to: '',
        items: [],
    },
    {
        id: 'aside_menu_customer4',
        level: 1,
        label: '고객접촉이력',
        to: '',
        items: [
            {
                id: 'aside_menu_customer4-1',
                level: 2,
                label: '고객접촉명세',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_customer4-2',
                level: 2,
                label: '고객대면관리',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_customer4-3',
                level: 2,
                label: '녹취내역',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_customer4-4',
                level: 2,
                label: '메시징/발송',
                to: '',
                items: [],
            },
        ],
    },
    {
        id: 'aside_menu_customer5',
        level: 1,
        label: '고객현황',
        to: '',
        items: [
            {
                id: 'aside_menu_customer5-1',
                level: 2,
                label: '지역별 고객현황',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_customer5-2',
                level: 2,
                label: '고객별 계약현황',
                to: '',
                items: [],
            },
        ],
    },
];

export const ASIDE_MENU_SALES: CoreMenuOption[] = [
    {
        id: 'aside_menu_sales1',
        level: 1,
        label: '영업명세총괄',
        to: '',
        items: [],
    },
    {
        id: 'aside_menu_sales2',
        level: 1,
        label: '영업추이',
        to: '',
        items: [
            {
                id: 'aside_menu_sales2-1',
                level: 2,
                label: '종합매출추이',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_sales2-2',
                level: 2,
                label: '장기',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_sales2-3',
                level: 2,
                label: '자동차',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_sales2-4',
                level: 2,
                label: '일반',
                to: '',
                items: [],
            },
        ],
    },
    {
        id: 'aside_menu_sales3',
        level: 1,
        label: '수금율',
        to: '',
        items: [],
    },
    {
        id: 'aside_menu_sales4',
        level: 1,
        label: '영업조직',
        to: '',
        items: [
            {
                id: 'aside_menu_sales4-1',
                level: 2,
                label: '가동현황',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_sales4-2',
                level: 2,
                label: '정착율 현황',
                to: '',
                items: [],
            },
        ],
    },
    {
        id: 'aside_menu_sales5',
        level: 1,
        label: '리스크관리',
        to: '',
        items: [
            {
                id: 'aside_menu_sales5-1',
                level: 2,
                label: '계약모집지표',
                to: '',
                items: [
                    {
                        id: 'aside_menu_sales5-1-1',
                        level: 3,
                        label: '종합모집지표',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-1-2',
                        level: 3,
                        label: '불완전판매명세',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-1-3',
                        level: 3,
                        label: '모집민원명세',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-1-4',
                        level: 3,
                        label: '월초월말계약집중 명세',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-1-5',
                        level: 3,
                        label: '청약철회율',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-1-6',
                        level: 3,
                        label: '고액계약명세',
                        to: '',
                        items: [],
                    },
                ],
            },
            {
                id: 'aside_menu_sales5-2',
                level: 2,
                label: '계약관리지표',
                to: '',
                items: [
                    {
                        id: 'aside_menu_sales5-2-1',
                        level: 3,
                        label: '계약유지율지표',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-2-2',
                        level: 3,
                        label: '모집-수금설계사 상이율',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-2-3',
                        level: 3,
                        label: '모집-수금설계사 상이내역',
                        to: '',
                        items: [],
                    },
                ],
            },
            {
                id: 'aside_menu_sales5-3',
                level: 2,
                label: '대리점 운영지표',
                to: '',
                items: [
                    {
                        id: 'aside_menu_sales5-3-1',
                        level: 3,
                        label: '수수료 환수율',
                        to: '',
                        items: [],
                    },
                ],
            },
            {
                id: 'aside_menu_sales5-4',
                level: 2,
                label: '계약자관리지표',
                to: '',
                items: [
                    {
                        id: 'aside_menu_sales5-4-1',
                        level: 3,
                        label: '누계5건이상 계약자',
                        to: '',
                        items: [],
                    },
                    {
                        id: 'aside_menu_sales5-4-2',
                        level: 3,
                        label: '누계월납 100만원 이상 계약자',
                        to: '',
                        items: [],
                    },
                ],
            },
            {
                id: 'aside_menu_sales5-5',
                level: 2,
                label: 'FRC관리지표',
                to: '',
                items: [
                    {
                        id: 'aside_menu_sales5-5-1',
                        level: 3,
                        label: '자기계약건수 3건 이상 FC',
                        to: '',
                        items: [],
                    },
                ],
            },
        ],
    },
];

export const ASIDE_MENU_CONTRACT: CoreMenuOption[] = [
    {
        id: 'aside_menu_contract1',
        level: 1,
        label: '장기',
        to: '',
        items: [
            {
                id: 'aside_menu_customer1-1',
                level: 2,
                label: '보유계약',
                to: '',
                items: [],
            },
            {
                id: 'aside_menu_customer1-2',
                level: 2,
                label: '상태변경내역',
                to: '',
                items: [],
            },
        ],
    },
];
