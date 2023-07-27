import type { CreateUserRequestPayload } from '@actions/hr/create-user.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import type { GetOrgaRequestPayload } from '@actions/hr/get-orga';
import type { GetUsersRequestPayload } from '@actions/hr/get-users';
import type { GetPermissionRequestPayload } from '@actions/hr/get-permission.action';
import type { GetUserRequestPayload } from '@actions/hr/get-user';
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

export function getCompanies() {
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

export function getOrga(payload: GetOrgaRequestPayload) {
    return getBackendAxios().get(`/orga/getsimpleorgainfo/${payload.idx}`);
}

export function getUsers(payload: GetUsersRequestPayload) {
    return getBackendAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

export function getUser(payload: GetUserRequestPayload) {
    return getBackendAxios().get(`/orga/userinfo/${payload.idx}`);
}

const rootServices = {
    login,
    getPermission,
    createUser,
    getCompanies,
    getBanks,
    getAgencies,
    getOrgas,
    getOrga,
    getUsers,
    getUser,
};

export default rootServices;
