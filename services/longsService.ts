import type { CreateLongRequestPayload } from '@actions/long/create-long.action';
import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import type { UpdateLongRequestPayload } from '@actions/long/update-long.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return getBackendAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

export function getLong({ idx }: GetLongRequestPayload) {
    return getBackendAxios().get(`/long/detail/${idx}`);
}

export function createLong(payload: CreateLongRequestPayload) {
    return getBackendAxios().post('/long/new', payload);
}

export function updateLong(payload: UpdateLongRequestPayload) {
    return getBackendAxios().post('/long/update', payload);
}

const rootServices = {
    getLongs,
    getLong,
    createLong,
    updateLong,
};

export default rootServices;
