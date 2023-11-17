import type { CoreMenuOption } from '@interfaces/core';

export const GNBS: CoreMenuOption[] = [
    { id: 'customer', label: '고객', to: '/customer' },
    { id: 'sales', label: '영업', to: '/sales' },
    { id: 'contract', label: '계약', to: '/contract/long/list' },
    { id: 'income', label: '소득', to: '/income' },
    { id: 'hr', label: '인사', to: '/hr' },
];

export const SUBMENUS: CoreMenuOption[] = [
    { id: 'submenu1', label: '통합검색', to: '#' },
    { id: 'submenu2', label: '일정관리', to: '/calendar' },
    { id: 'submenu3', label: '주요연락처', to: '#' },
    { id: 'submenu3', label: '본사원격지원', to: '#' },
    { id: 'submenu3', label: '에듀센터', to: '#' },
    { id: 'submenu3', label: 'SMS/Fax', to: '#' },
    { id: 'submenu5', label: 'Mypage', to: '#' },
];

export const ASIDE_MENU: any = {
    customer: {
        // join: {
        //     id: 'customer-join',
        //     label: '가입고객',
        //     to: '',
        //     create: {
        //         id: 'customer-join_create',
        //         label: '고객 등록',
        //         to: '/customer/join/create',
        //     },
        // },
    },
    sales: {},
    contract: {
        long: {
            id: 'contract-long',
            label: '장기',
            to: '',
            bo: {
                id: 'contract-long_bo',
                label: '장기보유계약',
                to: '/contract/long/bo',
            },
            sil: {
                id: 'contract-long_sil',
                label: '장기실적',
                to: '/contract/long/sil',
            },
            silhyo: {
                id: 'contract-long_silhyo',
                label: '실효명세',
                to: '/contract/long/silhyo',
            },
            buhwal: {
                id: 'contract-long_buhwal',
                label: '부활명세',
                to: '/contract/long/buhwal',
            },
            rule: {
                id: 'contract-long_rule',
                label: '장기 지급 제도 등록',
                to: '/contract/long/create-rule',
            },
            hwan: {
                id: 'contract-long_hwan',
                label: '장기 환수 제도 등록',
                to: '/contract/long/create-hwan',
            },
        },
        car: {
            id: 'contract-car',
            label: '자동차',
            to: '',
            bo: {
                id: 'contract-car_bo',
                label: '자동차보유계약',
                to: '/contract/car/bo',
            },
            // compare: {
            //     id: 'contract-car-compare',
            //     label: '비교견적',
            //     to: '/contract/car/compare',
            // },
        },
    },
    income: {},
    hr: {
        group: {
            id: 'hr-group',
            label: '조직관리',
            to: '',
            orga: {
                id: 'hr-group_orga',
                label: '지점명세',
                to: '/hr/group/orga',
            },
            user: {
                id: 'hr-group_user',
                label: '영업가족',
                to: '/hr/group/user',
            },
        },
    },
    board: {
        list: {
            id: 'board_list',
            label: '게시판목록',
            to: '/board/list',
        },
    },
    calendar: {
        id: 'calendar',
        label: '일정관리',
        to: '/calendar',
    },
};
