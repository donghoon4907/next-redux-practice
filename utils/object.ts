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
