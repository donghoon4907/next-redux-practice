export const ymdRegex = /^\d{4}-\d{2}-\d{2}$/;

export function isEmpty(value: any) {
    let output = false;

    if (typeof value === 'string') {
        output = value.trim() === '';
    } else if (value === undefined || value === null) {
        output = true;
    } else if (Array.isArray(value)) {
        output = value.length === 0;
    }

    return output;
}

export function isValidDateFormat(dateString: string, dateRegex: RegExp) {
    return dateRegex.test(dateString);
}
