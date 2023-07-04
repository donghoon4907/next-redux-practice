import type { CoreTabOption } from '@interfaces/core';

export const DETAIL_PAGE_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '소득설정', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '보증설정', panelId: 'tabpanelGuarantee' },
    // { id: 'tabAuthority', label: '시스템권한', panelId: 'tabpanelAuthority' },
    { id: 'tabFamiliy', label: '가족사항', panelId: 'tabpanelFamily' },
];
