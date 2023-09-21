/**
 * 주민등록번호를 일반나이로 변환하는 함수
 */
export function residentNumToAge(residentNumber: string): number {
    const strBirthday = residentNumToBirthday(residentNumber);

    return birthdayToAge(new Date(strBirthday));
}
// 주민등록번호를 생년월일로 변환하는 함수
export function residentNumToBirthday(residentNumber: string) {
    const year = residentNumber.substring(0, 2);
    const month = residentNumber.substring(2, 4);
    const day = residentNumber.substring(4, 6);
    // 2000년대생 여부
    const isMbaby = Number(residentNumber.charAt(6)) >= 3;

    let birthYear;
    if (isMbaby) {
        birthYear = 2000 + +year;
    } else {
        birthYear = 1900 + +year;
    }

    return `${birthYear}-${month}-${day}`;
}
// 생년월일을 일반나이로 변환하는함수
export function birthdayToAge(birthday: Date) {
    const today = new Date();

    return today.getFullYear() - birthday.getFullYear() + 1;
}
// 생년월일을 만나이로 변환하는함수
export function birthdayToInternationalAge(birthday: Date) {
    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    // 생년월일에서 년, 월, 일을 분리합니다.
    const birthYear = birthday.getFullYear();
    const birthMonth = birthday.getMonth() + 1;
    const birthDay = birthday.getDate();

    // 현재 연도와 생년의 연도를 비교하여 초기 만 나이를 계산합니다.
    let age = todayYear - birthYear;

    // 생일이 지나지 않았으면 1살을 뺍니다.
    if (
        todayMonth < birthMonth ||
        (todayMonth === birthMonth && todayDay < birthDay)
    ) {
        age--;
    }

    return age;
}

// 입금구분 반환
// contdate: 계약일
// paydate: 영수일
// whoi: 회차
export function makeDistkind(contdate: Date, paydate: Date, whoi: number) {
    const nextMonth = calcTargetMonth(contdate, whoi);

    const diffMonth = nextMonth - (paydate.getMonth() + 1);

    let distkind;
    if (diffMonth < -1) {
        distkind = '부활';
    } else if (diffMonth === -1) {
        distkind = '유예';
    } else if (diffMonth === 0) {
        distkind = '응당';
    } else {
        distkind = '선납';
    }

    return distkind;
}

// 대상년월 계산
export function calcTargetMonth(contdate: Date, whoi: number) {
    return contdate.getMonth() + whoi;
}
