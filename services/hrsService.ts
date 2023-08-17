import type { CreateUserRequestPayload } from '@actions/hr/create-user.action';
import type { LoginRequestPayload } from '@actions/hr/login.action';
import type { GetOrgasRequestPayload } from '@actions/hr/get-orgas';
import type { GetOrgaRequestPayload } from '@actions/hr/get-orga';
import type { GetUsersRequestPayload } from '@actions/hr/get-users';
import type { GetPermissionRequestPayload } from '@actions/hr/get-permission.action';
import type { GetUserRequestPayload } from '@actions/hr/get-user';
import type { UpdateUserRequestPayload } from '@actions/hr/update-user.action';
import type { GetCompaniesRequestPayload } from '@actions/hr/get-companies';
import type { GetCompanyRegNumRequestPayload } from '@actions/hr/get-company-regnum';
import type { GetProductsRequestPayload } from '@actions/hr/get-products';
import { getBackendAxios } from '@utils/axios/backend';

export function login(payload: LoginRequestPayload) {
    return getBackendAxios().post('/orga/login', payload);
}

export function getPermission(payload: GetPermissionRequestPayload) {
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

export function getCompanies(payload: GetCompaniesRequestPayload) {
    return getBackendAxios().get(`/finance/${payload}`);
}

export function getCompanyRegNum(payload: GetCompanyRegNumRequestPayload) {
    return getBackendAxios().get(`/customer/ckCompanyCust/${payload.num}`);
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

export function getProducts(payload: GetProductsRequestPayload) {
    return getBackendAxios().get(
        `/product/${payload.spe}/${payload.wcode}${
            payload.type ? `?type=${payload.type}` : ''
        }`,
    );
}

const rootServices = {
    login,
    getPermission,
    createUser,
    updateUser,
    getCompanies,
    getCompanyRegNum,
    getAgencies,
    getOrgas,
    getOrga,
    getUsers,
    getUser,
    getProducts,
};

export default rootServices;
