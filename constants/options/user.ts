import type { CoreSelectOption } from '@interfaces/core';

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

// 비교견적 설정 - 회사명
export const ESTIMATE_COMP: CoreSelectOption[] = [
    {
        label: '회사명',
        value: '회사명',
        isFixed: false,
    },
    {
        label: '지점명',
        value: '지점명',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 비교견적 설정 - 영업명
export const ESTIMATE_SALES: CoreSelectOption[] = [
    {
        label: '본인이름',
        value: '본인이름',
        isFixed: false,
    },
    {
        label: '지점명',
        value: '지점명',
        isFixed: false,
    },
    {
        label: '표기안함',
        value: '표기안함',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 비교견적 설정 - 대표전화
export const ESTIMATE_PHONE: CoreSelectOption[] = [
    {
        label: '회사전화',
        value: '회사전화',
        isFixed: false,
    },
    {
        label: '지점전화',
        value: '지점전화',
        isFixed: false,
    },
    {
        label: '핸드폰',
        value: '핸드폰',
        isFixed: false,
    },
    {
        label: '내선번호',
        value: '내선번호',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 비교견적 설정 - 팩스번호
export const ESTIMATE_FAX: CoreSelectOption[] = [
    {
        label: '지점팩스',
        value: '지점팩스',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 비교견적 설정 - 직통전화
export const ESTIMATE_DIRECT: CoreSelectOption[] = [
    {
        label: '회사전화',
        value: '회사전화',
        isFixed: false,
    },
    {
        label: '핸드폰',
        value: '핸드폰',
        isFixed: false,
    },
    {
        label: '내선번호',
        value: '내선번호',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 비교견적 설정 - 표기주소
export const ESTIMATE_ADDRESS: CoreSelectOption[] = [
    {
        label: '회사주소',
        value: '회사주소',
        isFixed: false,
    },
    {
        label: '지점주소',
        value: '지점주소',
        isFixed: false,
    },
    {
        label: '직접입력',
        value: '직접입력',
        isFixed: false,
    },
];

// 소득설정 탭 - 산출기준
export const CALC_STANDARD: CoreSelectOption[] = [
    {
        label: '기본+성과',
        value: '1',
        isFixed: false,
    },
    {
        label: '기본',
        value: '2',
        isFixed: false,
    },
    {
        label: '성과',
        value: '3',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 보증구분
export const GUARANTEE_DIVISION: CoreSelectOption[] = [
    {
        label: '이행보증',
        value: '01',
        isFixed: false,
    },
    {
        label: '신원보증',
        value: '02',
        isFixed: false,
    },
    {
        label: '질권설정',
        value: '03',
        isFixed: false,
    },
    {
        label: '공증',
        value: '04',
        isFixed: false,
    },
    {
        label: '적립금',
        value: '05',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 상태
export const GUARANTEE_STATUS: CoreSelectOption[] = [
    {
        label: '적립중',
        value: '01',
        isFixed: false,
    },
    {
        label: '적립완료',
        value: '02',
        isFixed: false,
    },
    {
        label: '일시중단',
        value: '03',
        isFixed: false,
    },
];

// 보증설정 내역 설정 모달 - 산출기준
export const C_STANDARD: CoreSelectOption[] = [
    {
        label: '소득전체',
        value: '01',
        isFixed: false,
    },
    {
        label: '건별수수료(전체)',
        value: '02',
        isFixed: false,
    },
    {
        label: '건별수수료(장기)',
        value: '03',
        isFixed: false,
    },
];

// 협회자격관리 - 자격구분
export const QUALIFICATION_DIVISION: CoreSelectOption[] = [
    {
        label: '유자격자',
        value: '유자격자',
        isFixed: false,
    },
    {
        label: '사용인',
        value: '사용인',
        isFixed: false,
    },
];

const rootSelectOptions = {
    birthType: BIRTH_TYPE,
    mobileCom: MOBILE_COM,
    emailCom: EMAIL_COM,
    userType: USER_TYPE,
    empStatus: EMP_STATUS,
    estComInputType: ESTIMATE_COMP,
    estSalesNmInputType: ESTIMATE_SALES,
    estPhoneInputType: ESTIMATE_PHONE,
    estFaxInputType: ESTIMATE_FAX,
    estDirectInputType: ESTIMATE_DIRECT,
    estAddrInputType: ESTIMATE_ADDRESS,
    calcStandard: CALC_STANDARD,
    calcStandard2: C_STANDARD,
    gDivision: GUARANTEE_DIVISION,
    gStatus: GUARANTEE_STATUS,
    qDivision: QUALIFICATION_DIVISION,
};

export default rootSelectOptions;
