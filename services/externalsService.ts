import { getExternalAxios } from '@utils/axios/external';

export function getIp({ isIPv6 }: any) {
    let url;
    if (isIPv6) {
        url = 'https://api64.ipify.org?format=json';
    } else {
        url = 'https://api.ipify.org?format=json';
    }

    return getExternalAxios().get(url);
}

export function calculate(payload: FormData) {
    return getExternalAxios().post(
        'http://cal.insnara.co.kr/estimate/outer_test_woori.asp',
        payload,
        {
            headers: {
                Accept: 'text/html',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );
}

const rootServices = {
    getIp,
    calculate,
};

export default rootServices;
