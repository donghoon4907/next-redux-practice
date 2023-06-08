import { DemoRequestPayload } from '@actions/demo/demo.action';
import axios from 'axios';

export function requestDemo(payload: DemoRequestPayload) {
    const formData = payload;

    return axios.post(`end point`, formData, {
        headers: {
            'content-type': 'multipart/form-data',
        },
    });
}
