import type { CoreSelectOption } from '@interfaces/core';

// 보장기간
const L_DURATION: CoreSelectOption[] = Array.from({ length: 50 }).map(
    (_, i) => ({
        label: `${i + 1}년`,
        value: `${i + 1}`,
    }),
);
// 필드목록
const L_FIELDS: CoreSelectOption[] = [
    {
        label: '계약번호',
        value: 'cnum',
        isFixed: false,
    },
    {
        label: '피보험자',
        value: 'p_name',
        isFixed: false,
    },
    {
        label: '계약자',
        value: 'c_name',
        isFixed: false,
    },
    {
        label: '상품코드',
        value: 'p_code',
        isFixed: false,
    },
    {
        label: '상품명',
        value: 'title',
        isFixed: false,
    },
    {
        label: '납입종기',
        value: 'pay_dateto',
        isFixed: false,
    },
    {
        label: '납입기간',
        value: 'pay_du',
        isFixed: false,
    },
    {
        label: '실적보험료',
        value: 'pay',
        isFixed: false,
    },
    {
        label: '수정보험료',
        value: 'tp',
        isFixed: false,
    },
    {
        label: '사용인코드',
        value: 'fccode',
        isFixed: false,
    },
];
// 납입주기
const L_PAYCYCLE: CoreSelectOption[] = [
    {
        label: '월납',
        value: '1',
        isFixed: false,
    },
    {
        label: '3월납',
        value: '3',
        isFixed: false,
    },
    {
        label: '6월납',
        value: '6',
        isFixed: false,
    },
    {
        label: '연납',
        value: '12',
        isFixed: false,
    },
    {
        label: '일시납',
        value: '0',
        isFixed: false,
    },
];
// 납입기간
const L_PAYDU: CoreSelectOption[] = [
    {
        label: '1년',
        value: '1',
        isFixed: false,
    },
    {
        label: '5년',
        value: '5',
        isFixed: false,
    },
    {
        label: '10년',
        value: '10',
        isFixed: false,
    },
    {
        label: '20년',
        value: '20',
        isFixed: false,
    },
    {
        label: '30년',
        value: '30',
        isFixed: false,
    },
    {
        label: '종신',
        value: '종신',
        isFixed: false,
    },
];

// 계약 상태
export const L_STATUS: CoreSelectOption[] = [
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
export const L_PSTATUS: CoreSelectOption[] = [
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
        label: '부활대상',
        value: '부활대상',
        isFixed: false,
    },
    {
        label: '납입불가',
        value: '납입불가',
        isFixed: false,
    },
    // {
    //     label: '임의해지',
    //     value: '임의해지',
    //     isFixed: false,
    // },
    // {
    //     label: '미납실효',
    //     value: '미납실효',
    //     isFixed: false,
    // },
    // {
    //     label: '보장종료',
    //     value: '보장종료',
    //     isFixed: false,
    // },
    // {
    //     label: '계약종료',
    //     value: '계약종료',
    //     isFixed: false,
    // },
    // {
    //     label: '타사이관',
    //     value: '타사이관',
    //     isFixed: false,
    // },
];

// 납입구분
export const L_PDIST: CoreSelectOption[] = [
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
        label: '추징',
        value: '추징',
        isFixed: false,
    },
    {
        label: '환급',
        value: '환급',
        isFixed: false,
    },
];

// 배서구분
export const L_EDIST: CoreSelectOption[] = [
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
    {
        label: '감액',
        value: '감액',
        isFixed: false,
    },
    {
        label: '부활',
        value: '부활',
        isFixed: false,
    },
];

// 금종
export const L_PAYKIND: CoreSelectOption[] = [
    {
        label: '카드',
        value: '카드',
        isFixed: false,
    },
    {
        label: '현금',
        value: '현금',
        isFixed: false,
    },
];
// 정산구분
export const L_CALTYPE: CoreSelectOption[] = [
    {
        label: '기본정산',
        value: '기본정산',
        isFixed: false,
    },
    {
        label: '기본정산 + 갱신',
        value: '기본정산 + 갱신',
        isFixed: false,
    },
    {
        label: '보류(회차변환O)',
        value: '보류(회차변환O)',
        isFixed: false,
    },
    {
        label: '보류(회차변환X)',
        value: '보류(회차변환X)',
        isFixed: false,
    },
    {
        label: '정산안함',
        value: '정산안함',
        isFixed: false,
    },
];
// 본인계약여부
export const L_FAMILY: CoreSelectOption[] = [
    {
        label: '해당없음',
        value: '',
        isFixed: false,
    },
    {
        label: '본인계약',
        value: 'Y',
        isFixed: false,
    },
    {
        label: '가족계약',
        value: 'N',
        isFixed: false,
    },
];
// 보종 목록
export const L_PTYPE: CoreSelectOption[] = [
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
    {
        label: '연저축',
        value: '연저축',
        isFixed: false,
    },
    // {
    //     label: '결산',
    //     value: '결산',
    //     isFixed: false,
    // },
];

const rootSelectOptions = {
    payCycle: L_PAYCYCLE,
    payDu: L_PAYDU,
    status: L_STATUS,
    pStatus: L_PSTATUS,
    pDist: L_PDIST,
    eDist: L_EDIST,
    payKind: L_PAYKIND,
    calType: L_CALTYPE,
    family: L_FAMILY,
    productType: L_PTYPE,
    fields: L_FIELDS,
    duration: L_DURATION,
};

export default rootSelectOptions;
