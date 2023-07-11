import type { CreateUserRequestPayload } from '@actions/hr/create.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import { getBackendAxios } from '@utils/axios/backend';
import { GetFcsRequestPayload } from '@actions/hr/get-fcs';

export function login(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function getPermission(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function createUser(payload: CreateUserRequestPayload) {
    return getBackendAxios().post('/orga/new_user', payload);
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    return getBackendAxios().get(`/orga/simpleOrgas/${payload.idx}`);
}

export function getFcs(payload: GetFcsRequestPayload) {
    return getBackendAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

const rootServices = {
    login,
    createUser,
    getOrgas,
    getFcs,
};

export default rootServices;
