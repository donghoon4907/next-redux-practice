export const emailRegex = /\S+@\S+\.\S+/;

export const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

export const onlyNumPhoneRegex = /^0[0-9]{1,2}\d{3,4}\d{4}$/;

export const onlyNumPhoneRegex2 = /^1\d{7}$/;

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}
// 휴대폰 형식 여부
export function isValidPhone(phone: string) {
    return phoneRegex.test(phone);
}
// 숫자형 데이터가 전화번호인지 여부 판별
export function isValidOnlyNumPhone(phone: string) {
    return onlyNumPhoneRegex.test(phone) || onlyNumPhoneRegex2.test(phone);
}
