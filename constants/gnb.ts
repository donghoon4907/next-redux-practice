import type { CoreMenuOption } from '@interfaces/core';

export const GNBS: CoreMenuOption[] = [
    { id: 'gnb1', label: '고객', to: '#' },
    { id: 'gnb2', label: '영업', to: '#' },
    { id: 'gnb3', label: '소득', to: '#' },
    { id: 'gnb4', label: '인사', to: '#' },
    { id: 'gnb5', label: 'Admin', to: '#' },
];

export const SUBMENUS: CoreMenuOption[] = [
    { id: 'submenu1', label: '통합검색', to: '#' },
    { id: 'submenu2', label: '주요연락처', to: '#' },
    { id: 'submenu3', label: '게시판', to: '#' },
];
