import carConstants from '@constants/options/car';
/**
 * 값이 숫자인 경우 true를 반환하고, 숫자가 아닌 경우 false를 반환합니다.
 * 0도 숫자로 취급됩니다.
 *
 */
export function isNumberic(value: any): boolean {
    // return !isNaN(parseFloat(value)) && isFinite(Number(value));
    return /^\d+$/.test(value);
}

/**
 * 좌측 정렬 적용 여부
 *
 */
export function checkTextAlignLeftNeeded(columnName: string) {
    let output = false;
    if (
        columnName === 'orga' ||
        columnName === 'team' ||
        columnName === 'cnum'
    ) {
        output = true;
    }

    return output;
}

/**
 * 원본 유지 컬럼 체크
 */
export function checkOrginNeeded(columnName: string) {
    let output = false;
    if (columnName === 'cnum') {
        output = true;
    }

    return output;
}

/**
 * 차량번호 체크
 */
export function checkCarnum(str: string) {
    // 차량번호 정규식(지역 포함, 미포함)
    const regex = [
        /^([가-힣]{2})([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
        /^([0-9]{2,3})([가-힣]{1})([0-9]{4})$/,
    ];

    // 정규식 매칭여부
    let isMatch = false;
    for (let i = 0; i < regex.length; i++) {
        const matches = regex[i].exec(str);

        if (matches) {
            isMatch = true;

            let locale = '';
            let type = '';
            let usage = '';
            let num = '';
            // 지역정보가 포함된 경우
            if (i === 0) {
                [, locale, type, usage, num] = matches;

                const findIndex = carConstants.locale.findIndex(
                    (v) => v.label === locale,
                );

                if (findIndex === -1) {
                    isMatch = false;
                    // feedback = '허용되지 않은 지역을 입력하였습니다.';

                    break;
                }
            } else if (i === 1) {
                [, type, usage, num] = matches;
            }

            if (!isNumberic(type)) {
                isMatch = false;
                // feedback = '차종을 확인하세요';

                break;
            }

            const findIndex = carConstants.usage.findIndex(
                (v) => v.label === usage,
            );

            if (findIndex === -1) {
                isMatch = false;
                // feedback = '허용되지 않은 용도를 입력하였습니다.';

                break;
            }

            if (!isNumberic(num)) {
                isMatch = false;
                // feedback = '등록번호를 확인하세요';

                break;
            }

            break;
        }
    }

    return isMatch;
}
