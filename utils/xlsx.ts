import * as XLSX from 'xlsx';

/**
 * 엑셀 파싱 후 컨버터를 실행시킨 값을 제공
 *
 */
export function readAndConvert(file: File, converter: Function) {
    const p = new Promise<{ fields: any[]; data: any[] }>((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (evt) => {
            // 파일의 내용
            const result = evt.target?.result;
            // Uint8Array로 변환
            const uintArray = new Uint8Array(result as ArrayBuffer);

            const workbook = XLSX.read(uintArray, { type: 'array' });
            // 엑셀파일의 첫 번째 시트명
            const firstSheetName = workbook.SheetNames[0];
            // 첫 번째 시트 로드
            const worksheet = workbook.Sheets[firstSheetName];
            // JSON 형태로 시트 데이터 파싱
            const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                header: 1,
            });

            const headers = jsonData[0] as any;
            const rows = jsonData.slice(1);

            resolve(converter(headers, rows));
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsArrayBuffer(file);
    });

    return p;
}
