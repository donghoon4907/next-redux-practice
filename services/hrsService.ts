import type { CreateUserRequestPayload } from '@actions/hr/create.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import { getAxios } from '@utils/axios';
import { GetFcsRequestPayload } from '@actions/hr/get-fcs';

export function login(payload: LoginRequestPayload) {
    return getAxios().post('/orga/login', payload);
}

export function getPermission(payload: LoginRequestPayload) {
    return getAxios().post('/orga/login', payload);
}

export function createUser(payload: CreateUserRequestPayload) {
    return getAxios().post('/orga/new_user', payload);
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    return getAxios().get(`/orga/simpleOrgas/${payload.idx}`);
}

export function getFcs(payload: GetFcsRequestPayload) {
    return getAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

const rootServices = {
    login,
    createUser,
    getOrgas,
    getFcs,
};

export default rootServices;
