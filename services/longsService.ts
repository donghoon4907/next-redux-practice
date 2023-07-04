import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import axios from 'axios';

export function getLong({ page, nums, ...rest }: GetLongRequestPayload) {
    return axios.post(`/long/sil?page=${page}&nums=${nums}`, rest);
}

const rootServices = {
    getLong,
};

export default rootServices;
