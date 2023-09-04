import type { CoreSelectOption } from '@interfaces/core';

// 인수구분
export const CAR_DIST: CoreSelectOption[] = [
    {
        label: '일반',
        value: '일반',
        isFixed: false,
    },
    {
        label: '공동',
        value: '공동',
        isFixed: false,
    },
];
// 납입구분
export const CAR_PAY_DIST: CoreSelectOption[] = [
    {
        label: '정상',
        value: '정상',
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
    {
        label: '해지',
        value: '해지',
        isFixed: false,
    },
];
// 납입방법
export const CAR_PAY_METHOD: CoreSelectOption[] = [
    {
        label: '일시납',
        value: '일시납',
        isFixed: false,
    },
    {
        label: '비연속 2회',
        value: '비연속 2회',
        isFixed: false,
    },
    ...[2, 3, 4, 5, 6, 10, 11].map((v) => ({
        label: `연속 ${v}회`,
        value: `연속 ${v}회`,
        isFixed: false,
    })),
];
// 자동차 계약 등급
export const CAR_C_GRADE: CoreSelectOption[] = [
    {
        label: 'A',
        value: 'A',
        isFixed: false,
    },
    {
        label: 'B',
        value: 'B',
        isFixed: false,
    },
    {
        label: 'C',
        value: 'C',
        isFixed: false,
    },
    {
        label: 'D',
        value: 'D',
        isFixed: false,
    },
    {
        label: '집중',
        value: '집중',
        isFixed: false,
    },
];
// 운전자 범위
export const CAR_DRIVER_RANGE: CoreSelectOption[] = [
    {
        label: '1인(기명)',
        value: '1인(기명)',
        isFixed: false,
    },
    {
        label: '1인(지정)',
        value: '1인(지정)',
        isFixed: false,
    },
    {
        label: '부부',
        value: '부부',
        isFixed: false,
    },
    {
        label: '부부+자녀',
        value: '부부+자녀',
        isFixed: false,
    },
    {
        label: '가족(형제자매제외)',
        value: '가족(형제자매제외)',
        isFixed: false,
    },
    {
        label: '가족+형제자매',
        value: '가족+형제자매',
        isFixed: false,
    },
    {
        label: '1인+1인',
        value: '1인+1인',
        isFixed: false,
    },
    {
        label: '1인+자녀',
        value: '1인+자녀',
        isFixed: false,
    },
    {
        label: '1인+가족1인',
        value: '1인+가족1인',
        isFixed: false,
    },
    {
        label: '임직원',
        value: '임직원',
        isFixed: false,
    },
    {
        label: '누구나',
        value: '누구나',
        isFixed: false,
    },
];
// 최저연령
export const CAR_MIN_AGE: CoreSelectOption[] = [
    {
        label: '전 연령',
        value: '전 연령',
        isFixed: false,
    },
    {
        label: '21세',
        value: '21세',
        isFixed: false,
    },
    {
        label: '22세',
        value: '22세',
        isFixed: false,
    },
    {
        label: '24세',
        value: '24세',
        isFixed: false,
    },
    {
        label: '26세',
        value: '26세',
        isFixed: false,
    },
    {
        label: '28세',
        value: '28세',
        isFixed: false,
    },
    {
        label: '30세',
        value: '30세',
        isFixed: false,
    },
    {
        label: '35세',
        value: '35세',
        isFixed: false,
    },
    {
        label: '43세',
        value: '43세',
        isFixed: false,
    },
    {
        label: '48세',
        value: '48세',
        isFixed: false,
    },
];
// 관계
export const CAR_RELATION: CoreSelectOption[] = [
    {
        label: '본인',
        value: '본인',
        isFixed: false,
    },
    {
        label: '부부',
        value: '부부',
        isFixed: false,
    },
    {
        label: '자녀',
        value: '자녀',
        isFixed: false,
    },
    {
        label: '가족',
        value: '가족',
        isFixed: false,
    },
    {
        label: '형제자매',
        value: '형제자매',
        isFixed: false,
    },
    {
        label: '기타지정',
        value: '기타지정',
        isFixed: false,
    },
];
// 차량 번호 - 지역
export const CAR_LOCALE: CoreSelectOption[] = [
    {
        label: '선택안함',
        value: '00',
        isFixed: false,
    },
    {
        label: '서울',
        value: '01',
        isFixed: false,
    },
    {
        label: '경기',
        value: '02',
        isFixed: false,
    },
    {
        label: '부산',
        value: '03',
        isFixed: false,
    },
    {
        label: '대구',
        value: '04',
        isFixed: false,
    },
    {
        label: '인천',
        value: '05',
        isFixed: false,
    },
    {
        label: '광주',
        value: '06',
        isFixed: false,
    },
    {
        label: '대전',
        value: '07',
        isFixed: false,
    },
    {
        label: '강원',
        value: '08',
        isFixed: false,
    },
    {
        label: '충북',
        value: '09',
        isFixed: false,
    },
    {
        label: '충남',
        value: '10',
        isFixed: false,
    },
    {
        label: '전북',
        value: '11',
        isFixed: false,
    },
    {
        label: '전남',
        value: '12',
        isFixed: false,
    },
    {
        label: '경북',
        value: '13',
        isFixed: false,
    },
    {
        label: '경남',
        value: '14',
        isFixed: false,
    },
    {
        label: '제주',
        value: '15',
        isFixed: false,
    },
    {
        label: '울산',
        value: '16',
        isFixed: false,
    },
];
// 차량 번호 - 용도
export const CAR_USAGE: CoreSelectOption[] = [
    {
        label: '가',
        value: '01',
        isFixed: false,
    },
    {
        label: '거',
        value: '02',
        isFixed: false,
    },
    {
        label: '고',
        value: '03',
        isFixed: false,
    },
    {
        label: '구',
        value: '04',
        isFixed: false,
    },
    {
        label: '그',
        value: '05',
        isFixed: false,
    },
    {
        label: '나',
        value: '06',
        isFixed: false,
    },
    {
        label: '너',
        value: '07',
        isFixed: false,
    },
    {
        label: '노',
        value: '08',
        isFixed: false,
    },
    {
        label: '누',
        value: '09',
        isFixed: false,
    },
    {
        label: '느',
        value: '10',
        isFixed: false,
    },
    {
        label: '다',
        value: '11',
        isFixed: false,
    },
    {
        label: '더',
        value: '12',
        isFixed: false,
    },
    {
        label: '도',
        value: '13',
        isFixed: false,
    },
    {
        label: '두',
        value: '14',
        isFixed: false,
    },
    {
        label: '드',
        value: '15',
        isFixed: false,
    },
    {
        label: '라',
        value: '16',
        isFixed: false,
    },
    {
        label: '러',
        value: '17',
        isFixed: false,
    },
    {
        label: '로',
        value: '18',
        isFixed: false,
    },
    {
        label: '루',
        value: '19',
        isFixed: false,
    },
    {
        label: '르',
        value: '20',
        isFixed: false,
    },
    {
        label: '마',
        value: '21',
        isFixed: false,
    },
    {
        label: '머',
        value: '22',
        isFixed: false,
    },
    {
        label: '모',
        value: '23',
        isFixed: false,
    },
    {
        label: '무',
        value: '24',
        isFixed: false,
    },
    {
        label: '므',
        value: '25',
        isFixed: false,
    },
    {
        label: '버',
        value: '26',
        isFixed: false,
    },
    {
        label: '보',
        value: '27',
        isFixed: false,
    },
    {
        label: '부',
        value: '28',
        isFixed: false,
    },
    {
        label: '브',
        value: '29',
        isFixed: false,
    },
    {
        label: '서',
        value: '30',
        isFixed: false,
    },
    {
        label: '소',
        value: '31',
        isFixed: false,
    },
    {
        label: '수',
        value: '32',
        isFixed: false,
    },
    {
        label: '스',
        value: '33',
        isFixed: false,
    },
    {
        label: '어',
        value: '34',
        isFixed: false,
    },
    {
        label: '오',
        value: '35',
        isFixed: false,
    },
    {
        label: '우',
        value: '36',
        isFixed: false,
    },
    {
        label: '으',
        value: '37',
        isFixed: false,
    },
    {
        label: '저',
        value: '38',
        isFixed: false,
    },
    {
        label: '조',
        value: '39',
        isFixed: false,
    },
    {
        label: '주',
        value: '40',
        isFixed: false,
    },
    {
        label: '즈',
        value: '41',
        isFixed: false,
    },
    {
        label: '처',
        value: '42',
        isFixed: false,
    },
    {
        label: '초',
        value: '43',
        isFixed: false,
    },
    {
        label: '추',
        value: '44',
        isFixed: false,
    },
    {
        label: '츠',
        value: '45',
        isFixed: false,
    },
    {
        label: '커',
        value: '46',
        isFixed: false,
    },
    {
        label: '코',
        value: '47',
        isFixed: false,
    },
    {
        label: '쿠',
        value: '48',
        isFixed: false,
    },
    {
        label: '크',
        value: '49',
        isFixed: false,
    },
    {
        label: '터',
        value: '50',
        isFixed: false,
    },
    {
        label: '토',
        value: '51',
        isFixed: false,
    },
    {
        label: '투',
        value: '52',
        isFixed: false,
    },
    {
        label: '트',
        value: '53',
        isFixed: false,
    },
    {
        label: '퍼',
        value: '54',
        isFixed: false,
    },
    {
        label: '포',
        value: '55',
        isFixed: false,
    },
    {
        label: '푸',
        value: '56',
        isFixed: false,
    },
    {
        label: '프',
        value: '57',
        isFixed: false,
    },
    {
        label: '호',
        value: '58',
        isFixed: false,
    },
    {
        label: '후',
        value: '59',
        isFixed: false,
    },
    {
        label: '흐',
        value: '60',
        isFixed: false,
    },
];
// 단기구분
export const CAR_SHORT_DIST: CoreSelectOption[] = [
    {
        label: '단기(출)',
        value: '단기(출)',
        isFixed: false,
    },
    {
        label: '단기(상)',
        value: '단기(상)',
        isFixed: false,
    },
    {
        label: '기타',
        value: '기타',
        isFixed: false,
    },
];
// 차량 등급
export const CAR_GRADE: CoreSelectOption[] = Array.from({ length: 27 }).map(
    (_, i) => ({
        label: `${i + 1}등급`,
        value: `${i + 1 > 0 ? i + 1 : `0${i + 1}`}`,
    }),
);
// 에어백
export const CAR_AIR_BACK: CoreSelectOption[] = [
    {
        label: '없음',
        value: '0',
        isFixed: false,
    },
    {
        label: '운전석 에어백',
        value: '1',
        isFixed: false,
    },
    {
        label: '운전석 및 조수석',
        value: '2',
        isFixed: false,
    },
    {
        label: '운전석 및 조수석+사이드',
        value: '3',
        isFixed: false,
    },
];
// 전방출동
export const CAR_CHUNG: CoreSelectOption[] = [
    {
        label: '없음',
        value: '없음',
        isFixed: false,
    },
    {
        label: '경고',
        value: '경고',
        isFixed: false,
    },
    {
        label: '비상제동',
        value: '비상제동',
        isFixed: false,
    },
    {
        label: '경고+비상제동',
        value: '경고+비상제동',
        isFixed: false,
    },
];
// 차선이탈
export const CAR_GPS: CoreSelectOption[] = [
    {
        label: '경고',
        value: '경고',
        isFixed: false,
    },
    {
        label: '유지',
        value: '유지',
        isFixed: false,
    },
    {
        label: '경고+유지',
        value: '경고+유지',
        isFixed: false,
    },
];
// 차량구매형태
export const CAR_P_TYPE: CoreSelectOption[] = [
    {
        label: '신차',
        value: '신차',
        isFixed: false,
    },
    {
        label: '중고차',
        value: '중고차',
        isFixed: false,
    },
];
// 유상운송
export const CAR_USANG: CoreSelectOption[] = [
    {
        label: '없음',
        value: '0',
        isFixed: false,
    },
    {
        label: '임대차계약버스',
        value: '1',
        isFixed: false,
    },
    {
        label: '마을버스/새마을버스',
        value: '2',
        isFixed: false,
    },
    {
        label: '전문용역업체소유차',
        value: '3',
        isFixed: false,
    },
    {
        label: '관계당국임시허가유상운송',
        value: '4',
        isFixed: false,
    },
    {
        label: '영업용전세버스/회사소유버스',
        value: '5',
        isFixed: false,
    },
    {
        label: '단체소속구성원용',
        value: '6',
        isFixed: false,
    },
    {
        label: '사설학원용/사용차',
        value: '7',
        isFixed: false,
    },
    {
        label: '고객수송버스',
        value: '8',
        isFixed: false,
    },
    {
        label: '기타법인소유버스',
        value: '9',
        isFixed: false,
    },
];
// 대인배상2
export const CAR_DAMBO2: CoreSelectOption[] = [
    {
        label: '가입안함',
        value: '0',
        isFixed: false,
    },
    {
        label: '무한',
        value: '1',
        isFixed: false,
    },
];
// 대물한도
export const CAR_DAMBO3: CoreSelectOption[] = [
    {
        label: '가입안함',
        value: '0',
        isFixed: false,
    },
    {
        label: '1천만원',
        value: '9',
        isFixed: false,
    },
    {
        label: '2천만원',
        value: '1',
        isFixed: false,
    },
    {
        label: '3천만원',
        value: '2',
        isFixed: false,
    },
    {
        label: '5천만원',
        value: '3',
        isFixed: false,
    },
    {
        label: '1억원',
        value: '4',
        isFixed: false,
    },
    {
        label: '2억원',
        value: '5',
        isFixed: false,
    },
    {
        label: '3억원',
        value: '6',
        isFixed: false,
    },
    {
        label: '5억원',
        value: '7',
        isFixed: false,
    },
    {
        label: '10억원',
        value: '8',
        isFixed: false,
    },
];
// 자손/자상
export const CAR_DAMBO4: CoreSelectOption[] = [
    {
        label: '가입안함',
        value: '0',
        isFixed: false,
    },
    {
        label: '1.5천/1.5천',
        value: '1',
        isFixed: false,
    },
    {
        label: '3천/1.5천',
        value: '2',
        isFixed: false,
    },
    {
        label: '5천/1.5천',
        value: '3',
        isFixed: false,
    },
    {
        label: '1억/1.5천',
        value: '4',
        isFixed: false,
    },
    {
        label: '3천/3천',
        value: '5',
        isFixed: false,
    },
    {
        label: '5천/3천',
        value: '6',
        isFixed: false,
    },
    {
        label: '1억/3천',
        value: '7',
        isFixed: false,
    },
    {
        label: '5천/5천',
        value: 'A',
        isFixed: false,
    },
    {
        label: '1억/5천',
        value: 'B',
        isFixed: false,
    },
    {
        label: '자상1억/1천',
        value: '8',
        isFixed: false,
    },
    {
        label: '자상2억/2천',
        value: '9',
        isFixed: false,
    },
    {
        label: '자상1억/2천',
        value: 'C',
        isFixed: false,
    },
    {
        label: '자상1억/3천',
        value: 'D',
        isFixed: false,
    },
    {
        label: '자상1억/5천',
        value: 'E',
        isFixed: false,
    },
    {
        label: '자상2억/3천',
        value: 'F',
        isFixed: false,
    },
    {
        label: '자상2억/5천',
        value: 'G',
        isFixed: false,
    },
    {
        label: '자상3억/3천',
        value: 'H',
        isFixed: false,
    },
    {
        label: '자상3억/5천',
        value: 'I',
        isFixed: false,
    },
];
// 무보험차
export const CAR_DAMBO5: CoreSelectOption[] = [
    {
        label: '가입안함',
        value: '0',
        isFixed: false,
    },
    {
        label: '2억원',
        value: '1',
        isFixed: false,
    },
    {
        label: '5억원',
        value: '3',
        isFixed: false,
    },
];
// 자기차량
export const CAR_DAMBO6: CoreSelectOption[] = [
    {
        label: '가입안함',
        value: '0',
        isFixed: false,
    },
    {
        label: '20%정률제',
        value: '1',
        isFixed: false,
    },
];
// 긴급출동
export const CAR_GOOUT_DIST: CoreSelectOption[] = [
    {
        label: '예(저가형)',
        value: '1',
        isFixed: false,
    },
    {
        label: '예(고가형)',
        value: '2',
        isFixed: false,
    },
    {
        label: '아니오',
        value: '0',
        isFixed: false,
    },
];
// 긴급출동 상세
export const CAR_GOOUT_DETAIL: CoreSelectOption[] = [
    {
        label: '전체가입',
        value: '1',
        isFixed: false,
    },
    {
        label: '잠금장치제외',
        value: '2',
        isFixed: false,
    },
    {
        label: '밧데리충전제외',
        value: '3',
        isFixed: false,
    },
    {
        label: '잠금밧데리제외',
        value: '4',
        isFixed: false,
    },
];
// 물적사고할증
export const CAR_MUL_SAGO: CoreSelectOption[] = [
    {
        label: '50만원',
        value: '50',
        isFixed: false,
    },
    {
        label: '100만원',
        value: '100',
        isFixed: false,
    },
    {
        label: '150만원',
        value: '150',
        isFixed: false,
    },
    {
        label: '200만원',
        value: '200',
        isFixed: false,
    },
];
// 마일리지
export const CAR_MILE_DIST: CoreSelectOption[] = [
    {
        label: '미가입',
        value: '미가입',
        isFixed: false,
    },
    {
        label: '선할인-실사',
        value: '선할인-실사',
        isFixed: false,
    },
    {
        label: '선할인-ODB',
        value: '선할인-ODB',
        isFixed: false,
    },
    {
        label: '후할인-실사',
        value: '후할인-실사',
        isFixed: false,
    },
    {
        label: '후할인-ODB',
        value: '후할인-ODB',
        isFixed: false,
    },
];
// 마일리지 상세
export const CAR_MILE_DETAIL: CoreSelectOption[] = [
    {
        label: '3천km이하(삼성4천/KB2천)',
        value: '3천km이하(삼성4천/KB2천)',
        isFixed: false,
    },
    {
        label: '5천km이하(삼성/KB-4천)',
        value: '5천km이하(삼성/KB-4천)',
        isFixed: false,
    },
    {
        label: '1만km이하(MG/현대-7천)',
        value: '1만km이하(MG/현대-7천)',
        isFixed: false,
    },
];
// 자녀 특약
export const CAR_DRATE_DIST: CoreSelectOption[] = [
    {
        label: '미가입',
        value: '미가입',
        isFixed: false,
    },
    {
        label: '자녀',
        value: '자녀',
        isFixed: false,
    },
    {
        label: '태아',
        value: '태아',
        isFixed: false,
    },
];
// 안전운전습관
export const CAR_TMAP_DIST: CoreSelectOption[] = [
    {
        label: '미가입',
        value: '미가입',
        isFixed: false,
    },
    {
        label: 'Tmap',
        value: 'Tmap',
        isFixed: false,
    },
    {
        label: '현대',
        value: '현대',
        isFixed: false,
    },
];
// 차량용도
export const CAR_USE: CoreSelectOption[] = [
    {
        label: '출퇴근용(영리)',
        value: '1',
        isFixed: false,
    },
    {
        label: '사업용(비영리)',
        value: '2',
        isFixed: false,
    },
    {
        label: '종교단체',
        value: '3',
        isFixed: false,
    },
];
// 총차량대수
export const CAR_CHILD_DRIVE: CoreSelectOption[] = [
    {
        label: '1대',
        value: '1',
        isFixed: false,
    },
    {
        label: '2대',
        value: '2',
        isFixed: false,
    },
    {
        label: '3대이상',
        value: '3',
        isFixed: false,
    },
];
// 가입경력 - 피보험자
export const CAR_EXP: CoreSelectOption[] = [
    ...Array.from({ length: 7 }).map((_, i) => ({
        label: `${i + 1}년미만`,
        value: `B${i + 1}`,
        isFixed: false,
    })),
    {
        label: '7년이상',
        value: 'B9',
        isFixed: false,
    },
];
// 가입경력 - 차량
export const CAR_EXP2: CoreSelectOption[] = [
    {
        label: '9개월미만',
        value: 'B1',
        isFixed: false,
    },
    {
        label: '9개월~1년미만',
        value: 'BA',
        isFixed: false,
    },
    ...Array.from({ length: 6 }).map((_, i) => ({
        label: `${i + 2}년미만`,
        value: `B${i + 2 > 3 ? i + 3 : i + 2}`,
        isFixed: false,
    })),
    {
        label: '7년이상',
        value: 'B9',
        isFixed: false,
    },
];
// 교통법규위반
export const CAR_TRAFFIC_VIO: CoreSelectOption[] = [
    {
        label: '할인(-0.3)',
        value: 'C0',
        isFixed: false,
    },
    {
        label: '0%',
        value: 'C1',
        isFixed: false,
    },
    {
        label: 'B031-지정차로 진로변경위반',
        value: 'B031',
        isFixed: false,
    },
    {
        label: 'B041-버스전용차로위반',
        value: 'B041',
        isFixed: false,
    },
    {
        label: 'B051-안전거리미확보',
        value: 'B051',
        isFixed: false,
    },
    {
        label: 'B101-안전운전의무위반',
        value: 'B101',
        isFixed: false,
    },
    {
        label: 'B111-노상다툼통행방해',
        value: 'B111',
        isFixed: false,
    },
    {
        label: 'B121-어린이통학보호위반',
        value: 'B121',
        isFixed: false,
    },
    {
        label: 'B131-어린이통학운전자위반',
        value: 'B131',
        isFixed: false,
    },
    {
        label: 'B141-고속도로갓길 전용선위반',
        value: 'B141',
        isFixed: false,
    },
    {
        label: 'B151-면허증제시위반',
        value: 'B151',
        isFixed: false,
    },
    {
        label: 'B171-평가대상기간중사고/기타위반',
        value: 'B171',
        isFixed: false,
    },
    {
        label: 'B011-신호 지시준수위반',
        value: 'B011',
        isFixed: false,
    },
    {
        label: 'B012-중앙선침범',
        value: 'B012',
        isFixed: false,
    },
    {
        label: 'B013-제한속도위반',
        value: 'B013',
        isFixed: false,
    },
    {
        label: 'B014-보행자보호의무위반',
        value: 'B014',
        isFixed: false,
    },
    {
        label: 'B021-차도통행 보행자방해',
        value: 'B021',
        isFixed: false,
    },
    {
        label: 'B061-앞지르기방법위반',
        value: 'B061',
        isFixed: false,
    },
    {
        label: 'B071-철길건널목통과위반',
        value: 'B071',
        isFixed: false,
    },
    {
        label: 'B081-보행자보호위반',
        value: 'B081',
        isFixed: false,
    },
    {
        label: 'B091-승객추락방지위반',
        value: 'B091',
        isFixed: false,
    },
    {
        label: 'B021-차도통행 보행자방해',
        value: 'B021',
        isFixed: false,
    },
    {
        label: 'B161-면허정지/취소',
        value: 'B161',
        isFixed: false,
    },
    {
        label: 'B162-경미한 법규위반',
        value: 'B162',
        isFixed: false,
    },
    {
        label: 'B181-정차/주차위반조치명령위반',
        value: 'B181',
        isFixed: false,
    },
    {
        label: 'B191-운전중 전화/영상의 표시/조작/사용',
        value: 'B191',
        isFixed: false,
    },
    {
        label: 'B201-차마에서 밖으로 물전을 던지는 행위',
        value: 'B201',
        isFixed: false,
    },
    {
        label: 'A141-신호,중침,속도(2-3회)',
        value: 'A141',
        isFixed: false,
    },
    {
        label: 'A142-신호,중침,속도(4회이상)',
        value: 'A142',
        isFixed: false,
    },
    {
        label: 'A131-주취(1회)',
        value: 'A131',
        isFixed: false,
    },
    {
        label: 'A151-신호,중침등2~3회+주취1회',
        value: 'A151',
        isFixed: false,
    },
    {
        label: 'A111-무면허',
        value: 'A111',
        isFixed: false,
    },
    {
        label: 'A121-뺑소니',
        value: 'A121',
        isFixed: false,
    },
    {
        label: 'A132-주취(2회이상)',
        value: 'A132',
        isFixed: false,
    },
];
// 건수
export const CAR_NUM_CASE: CoreSelectOption[] = Array.from({ length: 10 }).map(
    (_, i) => ({
        label: `${i}`,
        value: `${i}`,
    }),
);
// 할인할증
export const CAR_HALIN: CoreSelectOption[] = Array.from({ length: 29 }).reduce(
    (acc: CoreSelectOption[], cur, i) => {
        const output = [
            {
                label: `${i + 1}Z`,
                value: `${i + 1}Z`,
            },
            {
                label: `${i + 1}F`,
                value: `${i + 1}F`,
            },
        ];
        if (i > 25) {
            output.push({
                label: `${i + 1}P`,
                value: `${i + 1}P`,
            });
        }
        return acc.concat(output);
    },
    [],
);
// 기본할증
export const CAR_SPECIAL_CODE: CoreSelectOption[] = [
    {
        label: '0%',
        value: '0',
        isFixed: false,
    },
    {
        label: 'A3(위장사고)',
        value: 'A3',
        isFixed: false,
    },
    {
        label: 'A4(범죄사고)',
        value: 'A4',
        isFixed: false,
    },
    {
        label: 'A5(할증율 면탈계약)',
        value: 'A5',
        isFixed: false,
    },
    {
        label: 'B1(중대법규위반)',
        value: 'B1',
        isFixed: false,
    },
    {
        label: 'B2(음주운전)',
        value: 'B2',
        isFixed: false,
    },
    {
        label: 'B3(3년간 3회이상 사고)',
        value: 'B3',
        isFixed: false,
    },
    {
        label: 'B4(대인사망, 부상1-7급사고)',
        value: 'B4',
        isFixed: false,
    },
    {
        label: 'C1(3년간 2회이상 사고)',
        value: 'C1',
        isFixed: false,
    },
    {
        label: 'C2(대인부상 8급-10급사고)',
        value: 'C2',
        isFixed: false,
    },
    {
        label: 'C3(물적손해 500만원초과)',
        value: 'C3',
        isFixed: false,
    },
    {
        label: 'C4(물적손해 300만원초과 500만원 이하)',
        value: 'C4',
        isFixed: false,
    },
    {
        label: 'C5(물적손해 200만원초과 300만원 이하)',
        value: 'C5',
        isFixed: false,
    },
    {
        label: 'D1(1회사고자(50만원이하 제외))',
        value: 'D1',
        isFixed: false,
    },
];
// 3년간요율
export const CAR_SAGO3: CoreSelectOption[] = [
    {
        label: '미선택',
        value: '0',
        isFixed: false,
    },
    {
        label: 'N등급(할인등급)',
        value: 'N',
        isFixed: false,
    },
    {
        label: 'ZZZ등급(기타등급)',
        value: 'ZZZ',
        isFixed: false,
    },
];
// 전계약요율
export const CAR_PREV_SAGO: CoreSelectOption[] = [
    {
        label: '3년간사고요율2',
        value: '0',
        isFixed: false,
    },
    {
        label: '사고없음',
        value: 'N',
        isFixed: false,
    },
    {
        label: '사고있음',
        value: 'ZZZ',
        isFixed: false,
    },
];
// 사고점수
export const CAR_ACC_POINT: CoreSelectOption[] = [
    {
        label: '0점',
        value: '0',
        isFixed: false,
    },
    {
        label: '0.5점',
        value: '1',
        isFixed: false,
    },
    {
        label: '1점이상',
        value: '3',
        isFixed: false,
    },
];
// 블랙박스 장착 여부
export const CAR_HAS_BB: CoreSelectOption[] = [
    {
        label: '장착',
        value: '장착',
        isFixed: false,
    },
    {
        label: '미장착',
        value: '미장착',
        isFixed: false,
    },
];

const rootSelectOptions = {
    dist: CAR_DIST,
    payDist: CAR_PAY_DIST,
    payMethod: CAR_PAY_METHOD,
    cGrade: CAR_C_GRADE,
    grade: CAR_GRADE,
    driverRange: CAR_DRIVER_RANGE,
    minAge: CAR_MIN_AGE,
    relation: CAR_RELATION,
    locale: CAR_LOCALE,
    usage: CAR_USAGE,
    shortDist: CAR_SHORT_DIST,
    airBack: CAR_AIR_BACK,
    chung: CAR_CHUNG,
    gps: CAR_GPS,
    pType: CAR_P_TYPE,
    usang: CAR_USANG,
    dambo2: CAR_DAMBO2,
    dambo3: CAR_DAMBO3,
    dambo4: CAR_DAMBO4,
    dambo5: CAR_DAMBO5,
    dambo6: CAR_DAMBO6,
    gDist: CAR_GOOUT_DIST,
    gDetail: CAR_GOOUT_DETAIL,
    mSago: CAR_MUL_SAGO,
    mDist: CAR_MILE_DIST,
    mDetail: CAR_MILE_DETAIL,
    dDist: CAR_DRATE_DIST,
    tDist: CAR_TMAP_DIST,
    use: CAR_USE,
    cDrive: CAR_CHILD_DRIVE,
    exp: CAR_EXP,
    exp2: CAR_EXP2,
    tVio: CAR_TRAFFIC_VIO,
    numCase: CAR_NUM_CASE,
    halin: CAR_HALIN,
    sCode: CAR_SPECIAL_CODE.filter((v) => !['B1', 'B2'].includes(v.value)),
    sCode2: CAR_SPECIAL_CODE,
    sago3: CAR_SAGO3,
    prevSago: CAR_PREV_SAGO,
    accCount: CAR_ACC_POINT,
    hasBb: CAR_HAS_BB,
};

export default rootSelectOptions;
