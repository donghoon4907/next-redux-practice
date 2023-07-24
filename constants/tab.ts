import type { CoreTabOption } from '@interfaces/core';
/**
 * 영업가족 상세 페이지 탭 목록
 */
export const HR_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabIncome', label: '소득설정', panelId: 'tabpanelIncome' },
    { id: 'tabGuarantee', label: '보증설정', panelId: 'tabpanelGuarantee' },
    { id: 'tabAuthority', label: '권한설정', panelId: 'tabpanelAuthority' },
    {
        id: 'tabQualManage',
        label: '협회자격관리',
        panelId: 'tabpanelQualManage',
    },
];
/**
 * 장기 계약 상세 페이지 탭 목록
 */
export const LONG_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabPays', label: '수금실적', panelId: 'tabpanelPays' },
    { id: 'tabStatusHis', label: '상태이력', panelId: 'tabpanelStatusHis' },
    { id: 'tabChangeHis', label: '변경내역', panelId: 'tabpanelChangeHis' },
    { id: 'tabEtcs', label: '기타항목', panelId: 'tabpanelEtcs' },
];
/**
 * 게시판 등록 페이지 탭 목록
 */
export const BOARD_SETTING_TABS: CoreTabOption[] = [
    { id: 'tabSetBody', label: '본문설정', panelId: 'tabpanelSetBody' },
    { id: 'tabSetFile', label: '파일첨부', panelId: 'tabpanelSetFile' },
    { id: 'tabSetView', label: '보기설정', panelId: 'tabpanelSetView' },
];
/**
 * 사업부 상세 페이지 탭 목록
 */
export const DEPART_DETAIL_TABS: CoreTabOption[] = [
    { id: 'tabCommission', label: '수수료규정', panelId: 'tabpanelCommission' },
    { id: 'tabPayment', label: '지급설정', panelId: 'tabpanelPayment' },
    { id: 'tabMemo', label: '메모', panelId: 'tabpanelMemo' },
];
