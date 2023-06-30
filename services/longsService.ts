import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import axios from 'axios';

export function getLong(payload: GetLongRequestPayload) {
    return axios.get(`${process.env.BACKEND_DOMAIN}/long/sil`, {
        params: payload,
    });
}

const rootServices = {
    getLong,
};

export default rootServices;
