import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return getBackendAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

export function getLong({ cidx }: GetLongRequestPayload) {
    return getBackendAxios().get(`/long/detail/${cidx}`);
}

const rootServices = {
    getLongs,
    getLong,
};

export default rootServices;
