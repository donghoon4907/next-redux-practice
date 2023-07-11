import type { UploadRequestPayload } from '@actions/upload/upload.action';
import { getUploadAxios } from '@utils/axios/upload';

export function upload(payload: UploadRequestPayload) {
    return getUploadAxios().post(
        `/upload/${payload.category}`,
        payload.formData,
        {
            headers: {
                'content-type': 'multipart/form-data',
            },
        },
    );
}

const rootServices = {
    upload,
};

export default rootServices;
