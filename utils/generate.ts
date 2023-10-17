// 목록의 인덱스 값 설정
export function generateIndex(arr: Array<any>, start = 1) {
    let output = start;
    if (arr.length > 0) {
        output = arr[arr.length - 1].index + 1;
    }

    return output;
}

// 목록 데이터 생성
export function generateListSuccessPayload(data: any, payload: any) {
    const output: any = {
        rows: [],
        fields: [],
        total: {
            count: 0,
        },
        lastPayload: payload,
    };

    const { rows, fields, total } = data;

    if (rows) {
        output.rows = rows;
    }

    if (fields) {
        output.fields = fields;
    }

    if (total) {
        output.total = total;
    }

    return output;
}
