import type { CreateUserRequestPayload } from '@actions/hr/create-user.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgaRequestPayload } from '@actions/hr/get-orga';
import type { GetUsersRequestPayload } from '@actions/hr/get-users';
import type { GetPermissionRequestPayload } from '@actions/hr/get-permission.action';
import type { GetUserRequestPayload } from '@actions/hr/get-user';
import type { UpdateUserRequestPayload } from '@actions/hr/update-user.action';
import type { GetCompaniesRequestPayload } from '@actions/hr/get-companies';
import type { GetCompanyRegNumRequestPayload } from '@actions/hr/get-company-regnum';
import type { GetProductsRequestPayload } from '@actions/hr/get-products';
import type { SearchUsersRequestPayload } from '@actions/hr/search-users.action';
import type { CreateOrgaRequestPayload } from '@actions/hr/create-orga.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import type { UpdateOrgaRequestPayload } from '@actions/hr/update-orga.action';
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

export function getPermission(payload: GetPermissionRequestPayload) {
    return getBackendAxios().get(
        `/orga/permission?division=${payload.division}`,
    );
}

export function beforeCreateOrga(payload: CreateOrgaRequestPayload) {
    return axios.post('/api/create-orga', payload);
}

export function createOrga(payload: CreateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/new_orga', payload);
}

export function beforeUpdateOrga(payload: UpdateOrgaRequestPayload) {
    return axios.post('/api/create-orga', payload);
}

export function updateOrga(payload: UpdateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/new_orga', payload);
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
    return getBackendAxios().post('/orga/orga_update', payload);
}

export function getCompanies(payload: GetCompaniesRequestPayload) {
    return getBackendAxios().get(`/finance/${payload}`);
}

export function getCompanyRegNum(payload: GetCompanyRegNumRequestPayload) {
    return getBackendAxios().get(`/customer/ckCompanyCust/${payload.num}`);
}

export function getAgencies() {
    return getBackendAxios().get('/common/agencycom');
}

export function beforeGetOrgas(payload: GetOrgasRequestPayload) {
    return axios.get('/api/get-orgas', {
        params: {
            rate: payload.rate,
        },
    });
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    let search = '';
    if (payload.rate) {
        search += `?rate=${payload.rate}`;
    }

    return getBackendAxios().get(`/orga/simpleOrgas${search}`);
}

export function beforeGetSimpleOrga(payload: GetOrgaRequestPayload) {
    return axios.get('/api/get-simple-orga', {
        params: {
            idx: payload.idx,
        },
    });
}

export function getSimpleOrga(payload: GetOrgaRequestPayload) {
    return getBackendAxios().get(`/orga/getsimpleorgainfo/${payload.idx}`);
}

export function getOrga(payload: GetOrgaRequestPayload) {
    return getBackendAxios().get(`/orga/orgainfo/${payload.idx}`);
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

export function searchOrgas({
    page,
    nums,
    ...rest
}: SearchUsersRequestPayload) {
    return getBackendAxios().post(
        `/orga/list/orga?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getUser(payload: GetUserRequestPayload) {
    return getBackendAxios().get(`/orga/userinfo/${payload.idx}`);
}

export function beforeGetProducts(payload: GetProductsRequestPayload) {
    return axios.get('/api/get-products', {
        params: {
            spe: payload.spe,
            wcode: payload.wcode,
            type: payload.type,
        },
    });
}

export function getProducts(payload: GetProductsRequestPayload) {
    return getBackendAxios().get(
        `/product/${payload.spe}/${payload.wcode}${
            payload.type ? `?type=${payload.type}` : ''
        }`,
    );
}

const rootServices = {
    login,
    beforeLogout,
    logout,
    verify,
    getPermission,
    beforeCreateOrga,
    createOrga,
    beforeUpdateOrga,
    updateOrga,
    beforeCreateUser,
    createUser,
    beforeUpdateUser,
    updateUser,
    getCompanies,
    getCompanyRegNum,
    getAgencies,
    beforeGetOrgas,
    getOrgas,
    beforeGetSimpleOrga,
    getSimpleOrga,
    getOrga,
    getUsers,
    beforeGetUsers,
    searchUsers,
    searchOrgas,
    getUser,
    beforeGetProducts,
    getProducts,
};

export default rootServices;
