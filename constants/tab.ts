import type { CoreTabOption } from '@interfaces/core';

export const HR_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '소득설정', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '보증설정', panelId: 'tabpanelGuarantee' },
    // { id: 'tabAuthority', label: '시스템권한', panelId: 'tabpanelAuthority' },
    { id: 'tabFamiliy', label: '가족사항', panelId: 'tabpanelFamily' },
];

export const LONG_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '수금실적', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '상태이력', panelId: 'tabpanelGuarantee' },
    { id: 'tabFamiliy', label: '변경내역', panelId: 'tabpanelFamily' },
];
