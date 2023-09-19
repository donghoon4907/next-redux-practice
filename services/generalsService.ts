import type { CreateGeneralRequestPayload } from '@actions/contract/general/create-general.action';
import type { GetGeneralRequestPayload } from '@actions/contract/general/get-general.action';
import type { UpdateGeneralRequestPayload } from '@actions/contract/general/update-general.action';
import axios from 'axios';
import { getBackendAxios } from '@utils/axios/backend';

export function getGeneral({ idx }: GetGeneralRequestPayload) {
    return getBackendAxios().get(`/gen/detail/${idx}`);
}

export function beforeCreateGeneral(payload: CreateGeneralRequestPayload) {
    return axios.post('/api/create-general', payload);
}

export function createGeneral(payload: CreateGeneralRequestPayload) {
    return getBackendAxios().post('/gen/new', payload);
}

export function beforeUpdateGeneral(payload: UpdateGeneralRequestPayload) {
    return axios.post('/api/update-general', payload);
}

export function updateGeneral(payload: UpdateGeneralRequestPayload) {
    return getBackendAxios().post('/gen/update', payload);
}

const rootServices = {
    getGeneral,
    beforeCreateGeneral,
    createGeneral,
    beforeUpdateGeneral,
    updateGeneral,
};

export default rootServices;
