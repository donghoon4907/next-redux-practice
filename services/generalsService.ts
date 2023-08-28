import type { CreateGeneralRequestPayload } from '@actions/general/create-general.action';
import { getBackendAxios } from '@utils/axios/backend';

// export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
//     return getBackendAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
// }

// export function getLong({ cidx }: GetLongRequestPayload) {
//     return getBackendAxios().get(`/long/detail/${cidx}`);
// }

export function createGeneral(payload: CreateGeneralRequestPayload) {
    return getBackendAxios().post('/gen/new', payload);
}

// export function updateLong(payload: UpdateLongRequestPayload) {
//     return getBackendAxios().post('/long/update', payload);
// }

const rootServices = {
    createGeneral,
};

export default rootServices;
