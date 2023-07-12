import type { AxiosRequestConfig } from 'axios';
import type { UploadRequestPayload } from '@actions/upload/upload.action';
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

const rootServices = {
    upload,
};

export default rootServices;
