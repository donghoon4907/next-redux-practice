import type { CreateUserRequestPayload } from '@actions/hr/create.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import type { GetCompaniesRequestPayload } from '@actions/hr/get-companies';
import type { GetFcsRequestPayload } from '@actions/hr/get-fcs';
import type { GetPermissionRequestPayload } from '@actions/hr/get-permission.action';
import type { GetIpRequestPayload } from '@actions/hr/get-ip.action';
import { getBackendAxios } from '@utils/axios/backend';
import { getExternalAxios } from '@utils/axios/external';

export function login(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function getPermission(payload: GetPermissionRequestPayload) {
    return getBackendAxios().get(
        `/orga/permission${
            payload.division ? `?division${payload.division}` : ''
        }`,
    );
}

export function createUser(payload: CreateUserRequestPayload) {
    return getBackendAxios().post('/orga/new_user', payload);
}

export function getCompanies(payload: GetCompaniesRequestPayload) {
    return getBackendAxios().get('/common/company');
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    return getBackendAxios().get(`/orga/simpleOrgas/${payload.idx}`);
}

export function getFcs(payload: GetFcsRequestPayload) {
    return getBackendAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

export function getIp({ isIPv6 }: GetIpRequestPayload) {
    if (isIPv6) {
        return getExternalAxios().get('https://api64.ipify.org?format=json');
    } else {
        return getExternalAxios().get('https://api.ipify.org?format=json');
    }
}

const rootServices = {
    login,
    getPermission,
    createUser,
    getCompanies,
    getOrgas,
    getFcs,
    getIp,
};

export default rootServices;
