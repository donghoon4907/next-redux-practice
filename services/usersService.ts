import type { CreateUserRequestPayload } from '@actions/user/create-user.action';
import type { LoginRequestPayload } from '@actions/user/login.action';
import type { GetUsersRequestPayload } from '@actions/user/get-users.action';
import type { GetUserRequestPayload } from '@actions/user/get-user.action';
import type { UpdateUserRequestPayload } from '@actions/user/update-user.action';
import type { SearchUsersRequestPayload } from '@actions/user/search-users.action';
import { getBackendAxios } from '@utils/axios/backend';

export function login(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function logout() {
    return getBackendAxios().get(`/orga/logout/browser`);
}

export function getPermission(payload: any) {
    return getBackendAxios().get(
        `/orga/permission?division=${payload.division}`,
    );
}

export function createUser(payload: CreateUserRequestPayload) {
    return getBackendAxios().post('/orga/new_user', payload);
}

export function updateUser(payload: UpdateUserRequestPayload) {
    return getBackendAxios().post('/orga/user_update', payload);
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
    logout,
    getPermission,
    createUser,
    updateUser,
    getUsers,
    searchUsers,
    getUser,
};

export default rootServices;
