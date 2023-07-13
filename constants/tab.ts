import type { CoreTabOption } from '@interfaces/core';

export const HR_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '소득설정', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '보증설정', panelId: 'tabpanelGuarantee' },
    // { id: 'tabAuthority', label: '시스템권한', panelId: 'tabpanelAuthority' },
    { id: 'tabFamiliy', label: '가족사항', panelId: 'tabpanelFamily' },
];

export const LONG_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabPays', label: '수금실적', panelId: 'tabpanelPays' },
    { id: 'tabStatusHis', label: '상태이력', panelId: 'tabpanelStatusHis' },
    { id: 'tabChangeHis', label: '변경내역', panelId: 'tabpanelChangeHis' },
    { id: 'tabEtcs', label: '기타항목', panelId: 'tabpanelEtcs' },
];

export const BOARD_SETTING_TABS: CoreTabOption[] = [
    { id: 'tabSetBody', label: '본문설정', panelId: 'tabpanelSetBody' },
    { id: 'tabSetFile', label: '파일첨부', panelId: 'tabpanelSetFile' },
    { id: 'tabSetView', label: '보기설정', panelId: 'tabpanelSetView' },
];
