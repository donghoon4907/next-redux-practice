/**
 * 선택 업로드에 사용되는 엑셀 데이터 변환
 * 매핑시 발생하는 인덱스 값을 키값으로 만듦
 *
 */
export function convertForSelectUpload(
    headers: string[],
    rows: Array<Record<string, string>>,
) {
    const fields = headers.map((header, index) => ({
        label: header,
        value: index.toString(),
        // keys: [],
    }));

    const data = rows.map((row) => {
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
            obj[index.toString()] = row[index];
        });

        return obj;
    });

    return { fields, data };
}
/**
 * html 코드 escape 처리
 */
export function convertEscapeHtml(htmlString: string) {
    return htmlString.replace(/[&<>"']/g, function (match) {
        switch (match) {
            case '&':
                return '&amp;';
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '"':
                return '&quot;';
            case "'":
                return '&#39;';
            default:
                return match;
        }
    });
}
/**
 * 휴대폰 번호 - 처리
 */
export function convertPhoneNumber(phone: string) {
    let converted;
    if (phone.length === 8) {
        converted = phone.replace(/(\d{4})(\d{4})/, '$1-$2');
    } else if (phone.length === 10) {
        converted = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
    } else {
        converted = phone.replace(/(\d{3})(\d{4})(\d{1})/, '$1-$2-$3');
    }

    return converted;
}

/**
 * 휴대폰 번호 - 처리
 */
export function convertResidentNumber(residentNumber: string) {
    return residentNumber.replace(/(\d{6})(\d{1})/, '$1-$2');
}
