import type { CreateUserRequestPayload } from '@actions/hr/create.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import type { GetCompaniesRequestPayload } from '@actions/hr/get-companies';
import type { GetUsersRequestPayload } from '@actions/hr/get-users';
import type { GetPermissionRequestPayload } from '@actions/hr/get-permission.action';
import { getBackendAxios } from '@utils/axios/backend';

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

export function getBanks() {
    return getBackendAxios().get('/common/bank');
}

export function getAgencies() {
    return getBackendAxios().get('/common/agencycom');
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    return getBackendAxios().get(`/orga/simpleOrgas/${payload.idx}`);
}

export function getUsers(payload: GetUsersRequestPayload) {
    return getBackendAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

const rootServices = {
    login,
    getPermission,
    createUser,
    getCompanies,
    getBanks,
    getAgencies,
    getOrgas,
    getUsers,
};

export default rootServices;
