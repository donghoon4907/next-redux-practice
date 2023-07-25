export const emailRegex = /\S+@\S+\.\S+/;

export const phoneRegex = /^01(?:0|1|[6-9])-(?:\d{3,4})-\d{4}$/;

export function isValidEmail(email: string) {
    return emailRegex.test(email);
}

export function isValidPhone(phone: string) {
    return phoneRegex.test(phone);
}
