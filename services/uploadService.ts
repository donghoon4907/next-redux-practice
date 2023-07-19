import type { AxiosRequestConfig } from 'axios';
import type { UploadRequestPayload } from '@actions/upload/upload.action';
import type { UploadPortraitRequestPayload } from '@actions/upload/portrait.action';
import { getUploadAxios } from '@utils/axios/upload';

export function upload(
    payload: Omit<UploadRequestPayload, 'lastIndex'>,
    config: AxiosRequestConfig,
) {
    return getUploadAxios().post(
        `/upload/${payload.category}`,
        payload.formData,
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
            ...config,
        },
    );
}

export function portraitUpload(
    payload: UploadPortraitRequestPayload,
    config: AxiosRequestConfig,
) {
    return getUploadAxios().post(
        `/portraitupload/${payload.userid}`,
        payload.formData,
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
            ...config,
        },
    );
}

const rootServices = {
    upload,
    portraitUpload,
};

export default rootServices;
