export function chunkArray(inputArray: Array<any>, chunkSize: number) {
    const outputArray = [];

    for (let i = 0; i < inputArray.length; i += chunkSize) {
        const chunk = inputArray.slice(i, i + chunkSize);
        outputArray.push(chunk);
    }

    return outputArray;
}
