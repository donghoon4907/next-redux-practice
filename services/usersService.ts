import type { CreateUserRequestPayload } from '@actions/user/create-user.action';
import type { LoginRequestPayload } from '@actions/user/login.action';
import type { GetUsersRequestPayload } from '@actions/user/get-users.action';
import type { GetUserRequestPayload } from '@actions/user/get-user.action';
import type { UpdateUserRequestPayload } from '@actions/user/update-user.action';
import type { SearchUsersRequestPayload } from '@actions/user/search-users.action';
import axios from 'axios';
import { getBackendAxios } from '@utils/axios/backend';
import { getInternalAxios } from '@utils/axios/internal';

export function login(payload: LoginRequestPayload) {
    return getInternalAxios().post('/api/login', payload);
}

export function beforeLogout() {
    return getInternalAxios().post('/api/logout');
}

export function logout() {
    return getBackendAxios().get(`/orga/logout/browser`);
}

export function verify(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function getPermission(payload: any) {
    return getBackendAxios().get(
        `/orga/permission?division=${payload.division}`,
    );
}

export function beforeCreateUser(payload: CreateUserRequestPayload) {
    return axios.post('/api/create-user', payload);
}

export function createUser(payload: CreateUserRequestPayload) {
    return getBackendAxios().post('/orga/new_user', payload);
}

export function beforeUpdateUser(payload: UpdateUserRequestPayload) {
    return axios.post('/api/update-orga', payload);
}

export function updateUser(payload: UpdateUserRequestPayload) {
    return getBackendAxios().post('/orga/user_update', payload);
}

export function beforeGetUsers(payload: GetUsersRequestPayload) {
    return axios.get('/api/get-users', {
        params: {
            idx: payload.idx,
        },
    });
}

export function getUsers(payload: GetUsersRequestPayload) {
    return getBackendAxios().get(`/orga/simpleUsers/${payload.idx}`);
}

export function searchUsers({
    page,
    nums,
    ...rest
}: SearchUsersRequestPayload) {
    return getBackendAxios().post(
        `/orga/list/user?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getUser(payload: GetUserRequestPayload) {
    return getBackendAxios().get(`/orga/userinfo/${payload.idx}`);
}

const rootServices = {
    login,
    beforeLogout,
    logout,
    verify,
    getPermission,
    beforeCreateUser,
    createUser,
    beforeUpdateUser,
    updateUser,
    getUsers,
    beforeGetUsers,
    searchUsers,
    getUser,
};

export default rootServices;
