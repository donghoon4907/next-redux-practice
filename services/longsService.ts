import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import axiosInstance from '@utils/axios';

export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
    return axiosInstance.post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

export function getLong({ cidx }: GetLongRequestPayload) {
    return axiosInstance.get(`/long/detail/${cidx}`);
}

const rootServices = {
    getLongs,
    getLong,
};

export default rootServices;
