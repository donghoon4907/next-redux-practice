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
// 등급
export const CAR_GRADE: CoreSelectOption[] = [
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

const rootSelectOptions = {
    dist: CAR_DIST,
    payMethod: CAR_PAY_METHOD,
    grade: CAR_GRADE,
    driverRange: CAR_DRIVER_RANGE,
    minAge: CAR_MIN_AGE,
    relation: CAR_RELATION,
    locale: CAR_LOCALE,
    usage: CAR_USAGE,
    shortDist: CAR_SHORT_DIST,
};

export default rootSelectOptions;
