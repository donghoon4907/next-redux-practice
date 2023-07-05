import type { CookieValueTypes } from 'cookies-next';
import axios from 'axios';
import { getCookie } from 'cookies-next';

const axiosInstance = axios.create({
    baseURL: process.env.BACKEND_DOMAIN,
    //   timeout: 5000,
});

// 요청 전에 실행되는 인터셉터
axiosInstance.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = getCookie(process.env.COOKIE_TOKEN_KEY || '');

        updateAuthorization(token);
    }

    return config;
});

export function updateAuthorization(token: CookieValueTypes) {
    if (token) {
        axiosInstance.defaults.headers.common[
            'authorization'
        ] = `Bearer ${token}`;
    } else {
        axiosInstance.defaults.headers.common['authorization'] =
            'Bearer Non-members';
    }
}

export default axiosInstance;
