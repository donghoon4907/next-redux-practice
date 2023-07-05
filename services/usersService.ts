import type { CreateUserRequestPayload } from '@actions/user/create.action';
import type { LoginRequestPayload } from '@actions/user/login.action';
import type { GetOrgasRequestPayload } from '@actions/user/get-orgas';
import axiosInstance from '@utils/axios';

export function login(payload: LoginRequestPayload) {
    return axiosInstance.post('/orga/login', payload);
}

export function getPermission(payload: LoginRequestPayload) {
    return axiosInstance.post('/orga/login', payload);
}

export function createUser(payload: CreateUserRequestPayload) {
    return axiosInstance.post('/orga/new_user', payload);
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    return axiosInstance.get(`/orga/simpleOrgas/${payload.idx}`);
}

const rootServices = {
    login,
    createUser,
    getOrgas,
};

export default rootServices;
