import type { GetIpRequestPayload } from '@actions/hr/get-ip.action';
import { getExternalAxios } from '@utils/axios/external';

export function getIp({ isIPv6 }: GetIpRequestPayload) {
    let url;
    if (isIPv6) {
        url = 'https://api64.ipify.org?format=json';
    } else {
        url = 'https://api.ipify.org?format=json';
    }

    return getExternalAxios().get(url);
}

const rootServices = {
    getIp,
};

export default rootServices;
