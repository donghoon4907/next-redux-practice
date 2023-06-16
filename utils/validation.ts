/**
 * 값이 숫자인 경우 true를 반환하고, 숫자가 아닌 경우 false를 반환합니다.
 * 0도 숫자로 취급됩니다.
 *
 */
export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}
/**
 * 말줄임표 적용 여부
 *
 */
export function checkEllipsisNeeded(columnName: string) {
    let output = false;
    if (columnName === 'ptitle') {
        output = true;
    }

    return output;
}

/**
 * 천 단위 적용 여부
 *
 */
export function checkSeparatorNeeded(columnName: string) {
    let output = true;
    if (columnName === 'cnum') {
        output = false;
    }

    return output;
}
