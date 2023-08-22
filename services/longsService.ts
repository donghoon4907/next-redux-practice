import type { CreateLongRequestPayload } from '@actions/long/create-long.action';
import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return getBackendAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

export function getLong({ cidx }: GetLongRequestPayload) {
    return getBackendAxios().get(`/long/detail/${cidx}`);
}

export function createLong(payload: CreateLongRequestPayload) {
    return getBackendAxios().post('/long/new', payload);
}

const rootServices = {
    getLongs,
    getLong,
    createLong,
};

export default rootServices;
