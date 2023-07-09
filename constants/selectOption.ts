import type { CoreSelectOption } from '@interfaces/core';
// 리스트 보기 수
export const SHOW_COUNTS: CoreSelectOption[] = [
    {
        label: '25줄보기',
        value: '25',
        isFixed: false,
    },
    {
        label: '50줄보기',
        value: '50',
        isFixed: false,
    },
    {
        label: '100줄보기',
        value: '100',
        isFixed: false,
    },
    {
        label: '500줄보기',
        value: '500',
        isFixed: false,
    },
];
// 회차
export const ROUNDS: CoreSelectOption[] = [
    {
        label: '전체',
        value: '1,999',
        isFixed: false,
    },
    {
        label: '초회',
        value: '1,1',
        isFixed: false,
    },
    {
        label: '초년도',
        value: '1,12',
        isFixed: false,
    },
    {
        label: '2차년도이상',
        value: '13,999',
        isFixed: false,
    },
];
// 입금구분
export const DISTS: CoreSelectOption[] = [
    {
        label: '신규',
        value: '신규',
        isFixed: false,
    },
    {
        label: '계속',
        value: '계속',
        isFixed: false,
    },
    {
        label: '계속취소',
        value: '계속취소',
        isFixed: false,
    },
    {
        label: '철회',
        value: '철회',
        isFixed: false,
    },
    {
        label: '취소',
        value: '취소',
        isFixed: false,
    },
    {
        label: '실효',
        value: '실효',
        isFixed: false,
    },
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
];
// 생일 타입
export const BIRTH_TYPE: CoreSelectOption[] = [
    {
        label: '양력',
        value: 'Y',
        isFixed: false,
    },
    {
        label: '음력',
        value: 'N',
        isFixed: false,
    },
];
// 통신사
export const MOBILE_COM: CoreSelectOption[] = [
    {
        label: 'SKT',
        value: 'SKT',
        isFixed: false,
    },
    {
        label: 'KT',
        value: 'KT',
        isFixed: false,
    },
    {
        label: 'LGU',
        value: 'LGU',
        isFixed: false,
    },
    {
        label: 'KT알뜰폰',
        value: 'KT알뜰폰',
        isFixed: false,
    },
    {
        label: 'LGU알뜰폰',
        value: 'LGU알뜰폰',
        isFixed: false,
    },
];
// 이메일사
export const EMAIL_COM: CoreSelectOption[] = [
    {
        label: 'naver.com',
        value: 'naver.com',
        isFixed: false,
    },
    {
        label: 'gmail.com',
        value: 'gmail.com',
        isFixed: false,
    },
    {
        label: 'kakao.com',
        value: 'kakao.com',
        isFixed: false,
    },
    {
        label: 'daum.net',
        value: 'daum.net',
        isFixed: false,
    },
];
// 영업 가족 목록
export const USER_TYPE: CoreSelectOption[] = [
    {
        label: 'FRC',
        value: 'FRC',
        isFixed: false,
    },
    {
        label: '파트너',
        value: '파트너',
        isFixed: false,
    },
    {
        label: 'STAFF',
        value: 'STAFF',
        isFixed: false,
    },
];

// 재직 현황 목록
export const EMP_STATUS: CoreSelectOption[] = [
    {
        label: '상근',
        value: '상근',
        isFixed: false,
    },
    {
        label: '비상근',
        value: '비상근',
        isFixed: false,
    },
    {
        label: '퇴사',
        value: '퇴사',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];

// 보험사 목록1
export const INSU_COMP: CoreSelectOption[] = [
    {
        label: '삼성화재',
        value: '삼성화재',
        isFixed: false,
    },
    {
        label: '현대해상',
        value: '현대해상',
        isFixed: false,
    },
    {
        label: 'DB손해',
        value: 'DB손해',
        isFixed: false,
    },
];
// 보험사 목록2
export const COMPANY: CoreSelectOption[] = [
    {
        label: 'DB손해',
        value: '110',
        isFixed: false,
    },
];

// 보종 목록
export const PRODUCT_TYPE: CoreSelectOption[] = [
    {
        label: '인보장',
        value: '인보장',
        isFixed: false,
    },
    {
        label: '재물',
        value: '재물',
        isFixed: false,
    },
];

// 보험 기간
export const INSU_DURATION: CoreSelectOption[] = [
    {
        label: '1년',
        value: '1년',
        isFixed: false,
    },
    {
        label: '5년',
        value: '5년',
        isFixed: false,
    },
    {
        label: '10년',
        value: '10년',
        isFixed: false,
    },
    {
        label: '20년',
        value: '20년',
        isFixed: false,
    },
    {
        label: '30년',
        value: '30년',
        isFixed: false,
    },
    {
        label: '종신',
        value: '종신',
        isFixed: false,
    },
];

// 납입 주기
export const PAY_CYCLE: CoreSelectOption[] = [
    {
        label: '일시납',
        value: '일시납',
        isFixed: false,
    },
    {
        label: '월납',
        value: '월납',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3월납',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6월납',
        isFixed: false,
    },
    {
        label: '연납',
        value: '연납',
        isFixed: false,
    },
];

// 계약 상태
export const CON_STATUS: CoreSelectOption[] = [
    {
        label: '정상유지',
        value: '정상유지',
        isFixed: false,
    },
    {
        label: '계약철회',
        value: '계약철회',
        isFixed: false,
    },
    {
        label: '품보해지',
        value: '품보해지',
        isFixed: false,
    },
    {
        label: '민원해지',
        value: '민원해지',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];

// 수금 상태
export const PAY_STATUS: CoreSelectOption[] = [
    {
        label: '납입중',
        value: '납입중',
        isFixed: false,
    },
    {
        label: '납입유예',
        value: '납입유예',
        isFixed: false,
    },
    {
        label: '납입면제',
        value: '납입면제',
        isFixed: false,
    },
    {
        label: '납입완료',
        value: '납입완료',
        isFixed: false,
    },
    {
        label: '임의해지',
        value: '임의해지',
        isFixed: false,
    },
    {
        label: '미납실효',
        value: '미납실효',
        isFixed: false,
    },
    {
        label: '보장종료',
        value: '보장종료',
        isFixed: false,
    },
    {
        label: '계약종료',
        value: '계약종료',
        isFixed: false,
    },
    {
        label: '타사이관',
        value: '타사이관',
        isFixed: false,
    },
];
