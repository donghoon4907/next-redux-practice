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

    if (data.hasOwnProperty('data')) {
        const target = data.data;

        if (target.hasOwnProperty('rows')) {
            output.rows = target['rows'];
        }

        if (target.hasOwnProperty('fields')) {
            output.fields = target['fields'];
        }

        if (target.hasOwnProperty('total')) {
            output.total = target['total'];
        }
    }

    return output;
}
