import type { LoginRequestPayload } from '@actions/user/login.action';
import axios from 'axios';

export function login(payload: LoginRequestPayload) {
    return axios.post(`${process.env.BACKEND_DOMAIN}/orga/login`, payload);
}

export function getPermission(payload: LoginRequestPayload) {
    return axios.post(`${process.env.BACKEND_DOMAIN}/orga/login`, payload);
}

const rootServices = {
    login,
};

export default rootServices;
