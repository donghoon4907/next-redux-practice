/**
 * 값이 숫자인 경우 true를 반환하고, 숫자가 아닌 경우 false를 반환합니다.
 * 0도 숫자로 취급됩니다.
 *
 */
export function isNumeric(value: any): boolean {
    return !isNaN(parseFloat(value)) && isFinite(Number(value));
}
