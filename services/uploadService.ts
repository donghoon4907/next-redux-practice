import type { UploadImageRequestPayload } from '@actions/upload/image.action';
import axios from 'axios';

export function uploadImage(payload: UploadImageRequestPayload) {
    return axios.post('/upload', payload.formData, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}

const rootServices = {
    uploadImage,
};

export default rootServices;
