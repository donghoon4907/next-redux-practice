import type { GetOrgaRequestPayload } from '@actions/orga/get-orga.action';
import type { SearchUsersRequestPayload } from '@actions/user/search-users.action';
import type { CreateOrgaRequestPayload } from '@actions/orga/create-orga.action';
import type { GetOrgasRequestPayload } from '@actions/orga/get-orgas.action';
import type { UpdateOrgaRequestPayload } from '@actions/orga/update-orga.action';
import { getBackendAxios } from '@utils/axios/backend';

export function createOrga(payload: CreateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/new_orga', payload);
}

export function updateOrga(payload: UpdateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/orga_update', payload);
}

export function getOrgas(payload: GetOrgasRequestPayload) {
    let search = '';
    if (payload.rate) {
        search += `?rate=${payload.rate}`;
    }

    return getBackendAxios().get(`/orga/simpleOrgas${search}`);
}

export function getSimpleOrga(payload: GetOrgaRequestPayload) {
    return getBackendAxios().get(`/orga/getsimpleorgainfo/${payload.idx}`);
}

export function getOrga(payload: GetOrgaRequestPayload) {
    return getBackendAxios().get(`/orga/orgainfo/${payload.idx}`);
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

const rootServices = {
    createOrga,
    updateOrga,
    getOrgas,
    getSimpleOrga,
    getOrga,
    searchOrgas,
};

export default rootServices;
