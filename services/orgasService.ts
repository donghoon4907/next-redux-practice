import type { GetOrgaRequestPayload } from '@actions/orga/get-orga.action';
import type { SearchUsersRequestPayload } from '@actions/user/search-users.action';
import type { CreateOrgaRequestPayload } from '@actions/orga/create-orga.action';
import type { GetOrgasRequestPayload } from '@actions/orga/get-orgas.action';
import type { UpdateOrgaRequestPayload } from '@actions/orga/update-orga.action';
import axios from 'axios';
import { getBackendAxios } from '@utils/axios/backend';

export function beforeCreateOrga(payload: CreateOrgaRequestPayload) {
    return axios.post('/api/create-orga', payload);
}

export function createOrga(payload: CreateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/new_orga', payload);
}

export function beforeUpdateOrga(payload: UpdateOrgaRequestPayload) {
    return axios.post('/api/update-orga', payload);
}

export function updateOrga(payload: UpdateOrgaRequestPayload) {
    return getBackendAxios().post('/orga/orga_update', payload);
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
    beforeCreateOrga,
    createOrga,
    beforeUpdateOrga,
    updateOrga,
    beforeGetOrgas,
    getOrgas,
    beforeGetSimpleOrga,
    getSimpleOrga,
    getOrga,
    searchOrgas,
};

export default rootServices;
