export const emailRegex = /\S+@\S+\.\S+/;

export const phoneRegex = /^01[0-9]-\d{3,4}-\d{4}$/;

export const onlyNumPhoneRegex = /^0[0-9]{1,2}\d{8}$/;

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
    return phoneRegex.test(phone);
}

export function isValidOnlyNumPhone(phone: string) {
    return onlyNumPhoneRegex.test(phone);
}
