/**
 * 값이 숫자인 경우 true를 반환하고, 숫자가 아닌 경우 false를 반환합니다.
 * 0도 숫자로 취급됩니다.
 *
 */
export function isNumberic(value: any): boolean {
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
    /**
     * cnum: 계약번호
     * orga: 조직
     * cycle: 납입주기
     * bo_du: 보장기간
     * whoi: 회차
     * pay_du: 납입기간
     */
    const omits = [
        'cnum',
        'bno',
        'orga',
        'cycle',
        'bo_du',
        'whoi',
        'pay_du',
        'fccode',
        '사용인코드',
    ];
    if (omits.some((v) => columnName === v)) {
        output = false;
    }

    return output;
}

/**
 * 가운데 적용 여부
 *
 */
export function checkTextAlignRightNeeded(columnName: string) {
    let output = true;
    if (columnName === 'bviews') {
        output = false;
    }

    return output;
}
