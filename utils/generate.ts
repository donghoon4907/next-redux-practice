// 목록의 인덱스 값 설정
export function generateIndex(arr: Array<any>, start = 1) {
    let output = start;
    if (arr.length > 0) {
        output = arr[arr.length - 1].index + 1;
    }

    return output;
}
