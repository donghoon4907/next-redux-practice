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
