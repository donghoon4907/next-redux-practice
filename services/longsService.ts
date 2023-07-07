import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import { getAxios } from '@utils/axios';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return getAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

export function getLong({ cidx }: GetLongRequestPayload) {
    return getAxios().get(`/long/detail/${cidx}`);
}

const rootServices = {
    getLongs,
    getLong,
};

export default rootServices;
