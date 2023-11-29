import type { CreateLongRequestPayload } from '@actions/long/create-long.action';
import type { GetLongRequestPayload } from '@actions/long/get-long.action';
import type { GetLongsRequestPayload } from '@actions/long/get-longs.action';
import type { UpdateLongRequestPayload } from '@actions/long/update-long.action';
import type { UploadLongRequestPayload } from '@actions/long/upload-long.action';
import type { GetLongSilsRequestPayload } from '@actions/long/get-sils.action';
import type { GetLongSilhyosRequestPayload } from '@actions/long/get-silhyos.action';
import { getNodeAxios } from '@utils/axios/node';
import { getBackendAxios } from '@utils/axios/backend';

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

export function getLongBuhwals({
    page,
    nums,
    ...rest
}: GetLongSilhyosRequestPayload) {
    return getBackendAxios().post(
        `/long/list/buhwal?page=${page}&nums=${nums}`,
        rest,
    );
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
    getLongBuhwals,
    getLong,
    createLong,
    updateLong,
    uploadLong,
    getLongFields,
};

export default rootServices;
