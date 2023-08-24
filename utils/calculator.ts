/**
 * 주민등록번호를 일반나이로 변환하는 함수
 * 
 * @param residentNumber 
 * @backup
 *  주민번호 앞 7자리를 추출합니다.
    const birthDate = residentNumber.substring(0, 6);
    // 2000년대생 여부
    const isMbaby = Number(residentNumber.charAt(6)) >= 3
    // 현재 날짜를 가져옵니다.
    const currentDate = new Date()
    // 생년월일을 추출합니다.
    const year = Number(birthDate.substring(0, 2));
    const month = Number(birthDate.substring(2, 4));
    const day = Number(birthDate.substring(4, 6))
    // 현재 날짜를 이용하여 만 나이를 계산합니다.
    let age = currentDate.getFullYear() - ((isMbaby ? 2000 : 1900) + year)
    // 생일이 지났는지 체크합니다.
    if (
        month < currentDate.getMonth() + 1 ||
        (month === currentDate.getMonth() + 1 && day <= currentDate.getDate())
    ) {
        // 생일이 지났으면 나이를 1 증가시킵니다.
        age++;
    }
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
