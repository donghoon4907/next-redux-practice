// 값으로 일치하는 셀렉트 옵션 찾기
export function findSelectOption(value: any, arr: any[]) {
    let output = null;
    if (value) {
        const findIndex = arr.findIndex((v) => v.value == value);

        if (findIndex !== -1) {
            output = arr[findIndex];
        }
    }

    return output;
}
