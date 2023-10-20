import type { CreateLongRequestPayload } from '@actions/contract/long/create-long.action';
import type { GetLongRequestPayload } from '@actions/contract/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/contract/long/get-longs.action';
import type { UpdateLongRequestPayload } from '@actions/contract/long/update-long.action';
import type { UploadLongRequestPayload } from '@actions/contract/long/upload-long.action';
import type { GetLongSilsRequestPayload } from '@actions/contract/long/get-long-sils.action';
import type { GetLongSilhyosRequestPayload } from '@actions/contract/long/get-long-silhyos.action';
import axios from 'axios';
import { getBackendAxios } from '@utils/axios/backend';
import { getNodeAxios } from '@utils/axios/node';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return getBackendAxios().post(
        `/long/list/bo?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getLongSils({
    page,
    nums,
    ...rest
}: GetLongSilsRequestPayload) {
    return getBackendAxios().post(
        `/long/list/sil?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getLongSilhyos({
    page,
    nums,
    ...rest
}: GetLongSilhyosRequestPayload) {
    return getBackendAxios().post(
        `/long/list/silhyo?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getLong({ idx }: GetLongRequestPayload) {
    return getBackendAxios().get(`/long/detail/${idx}`);
}

export function beforeCreateLong(payload: CreateLongRequestPayload) {
    return axios.post('/api/create-long', payload);
}

export function createLong(payload: CreateLongRequestPayload) {
    return getBackendAxios().post('/long/new', payload);
}

export function beforeUpdateLong(payload: UpdateLongRequestPayload) {
    return axios.post('/api/update-long', payload);
}

export function updateLong(payload: UpdateLongRequestPayload) {
    return getBackendAxios().post('/long/update', payload);
}

export function uploadLong(payload: UploadLongRequestPayload) {
    return getNodeAxios().post('/long/upload', payload);
}

export function getLongFields() {
    return getNodeAxios().get(`/long/fields`);
}

const rootServices = {
    getLongs,
    getLongSils,
    getLongSilhyos,
    getLong,
    beforeCreateLong,
    createLong,
    beforeUpdateLong,
    updateLong,
    uploadLong,
    getLongFields,
};

export default rootServices;
