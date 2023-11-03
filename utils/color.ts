export function textToBadgeColor(str: string) {
    let output;

    if (str === '인보장') {
        output = 'red';
    } else if (str === '종신') {
        output = 'navy';
    } else if (str === '재물') {
        output = 'darkgray';
    } else if (str === '연저축') {
        output = 'yellow';
    } else if (str === '보장') {
        output = 'lightblue';
    } else if (str === '건강보험') {
        output = 'lightgray';
    }

    return output;
}
