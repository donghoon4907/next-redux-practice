import { DemoRequestPayload } from '@actions/demo/demo.action';
import axios from 'axios';

export function requestDemo(payload: DemoRequestPayload) {
    return axios.get('/api/dummy');
}
