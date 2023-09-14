export function flattenObject(obj: Record<string, any>) {
    let result: any[] = [];

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (typeof obj[key] === 'object') {
                result = result.concat(flattenObject(obj[key])); // 재귀 호출
            } else {
                result.push({
                    label: key,
                    value: obj[key],
                });
            }
        }
    }

    return result;
}

export function flattenArray(arr: any[][]) {
    const flattened = [];

    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            // 만약 요소가 배열이라면, 다시 반복하여 모든 요소를 추가합니다.
            for (let j = 0; j < arr[i].length; j++) {
                flattened.push(arr[i][j]);
            }
        } else {
            // 요소가 배열이 아니라면 그대로 추가합니다.
            flattened.push(arr[i]);
        }
    }

    return flattened;
}
