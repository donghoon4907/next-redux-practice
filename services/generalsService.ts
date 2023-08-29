import type { CreateGeneralRequestPayload } from '@actions/general/create-general.action';
import type { GetGeneralRequestPayload } from '@actions/general/get-general.action';
import type { UpdateGeneralRequestPayload } from '@actions/general/update-general.action';
import { getBackendAxios } from '@utils/axios/backend';

// export function getLongs({ page, nums, ...rest }: GetLongsRequestPayload) {
//     return getBackendAxios().post(`/long/sil?page=${page}&nums=${nums}`, rest);
// }

export function getGeneral({ idx }: GetGeneralRequestPayload) {
    return getBackendAxios().get(`/gen/detail/${idx}`);
}

export function createGeneral(payload: CreateGeneralRequestPayload) {
    return getBackendAxios().post('/gen/new', payload);
}

export function updateGeneral(payload: UpdateGeneralRequestPayload) {
    return getBackendAxios().post('/gen/update', payload);
}

const rootServices = {
    createGeneral,
    getGeneral,
    updateGeneral,
};

export default rootServices;
