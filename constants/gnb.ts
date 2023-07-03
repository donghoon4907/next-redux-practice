import type { CoreMenuOption } from '@interfaces/core';

export const GNBS: CoreMenuOption[] = [
    { id: 'gnb1', level: 1, label: '고객', to: '#' },
    { id: 'gnb2', level: 1, label: '영업', to: '#' },
    { id: 'gnb6', level: 1, label: '계약', to: '#' },
    { id: 'gnb3', level: 1, label: '소득', to: '#' },
    { id: 'gnb4', level: 1, label: '인사', to: '#' },
    { id: 'gnb5', level: 1, label: 'Admin', to: '#' },
];

export const SUBMENUS: CoreMenuOption[] = [
    { id: 'submenu1', level: 1, label: '통합검색', to: '#' },
    { id: 'submenu2', level: 1, label: '주요연락처', to: '#' },
    { id: 'submenu3', level: 1, label: '게시판', to: '#' },
];

export const ASIDE_MENUS: CoreMenuOption[] = [
    {
        id: 'aside_menu1',
        level: 1,
        label: '영업매출통계',
        to: '',
        items: [
            {
                id: 'aside_menu1-1',
                level: 2,
                label: '당월실적',
                to: '',
                items: [
                    {
                        id: 'aside_menu1-1-1',
                        level: 3,
                        label: '종합 실적',
                        to: '/demo',
                    },
                    // {
                    //     id: 'aside_menu1-1-2',
                    //     level: 3,
                    //     label: '장기 실적',
                    //     to: '/test2',
                    // },
                    // {
                    //     id: 'aside_menu1-1-3',
                    //     level: 3,
                    //     label: '자동차 실적',
                    //     to: '/test3',
                    // },
                    // {
                    //     id: 'aside_menu1-1-4',
                    //     level: 3,
                    //     label: '일반 실적',
                    //     to: '/test4',
                    // },
                ],
            },
        ],
    },
];
