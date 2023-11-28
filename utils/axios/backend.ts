import type { CookieValueTypes } from 'cookies-next';
import type { AxiosInstance } from 'axios';
import { createAxiosInstance } from '.';

let instance: AxiosInstance | null = null;

let baseURL = '';
// 서버사이드에서는 rewrites가 작동하지 않으므로 직접 호출
if (typeof window === 'undefined') {
    baseURL += process.env.BACKEND_DOMAIN;
} else {
    baseURL += '/api';
}

// 싱글톤 객체를 가져오는 함수
export const getBackendAxios = () => {
    // 인스턴스가 이미 존재하는 경우, 기존 인스턴스 반환
    if (instance) {
        return instance;
    }

    // 인스턴스가 없는 경우, 새로운 인스턴스 생성
    instance = createAxiosInstance({ baseURL });

    return instance;
};

export const initialzeAxios = (token: CookieValueTypes) => {
    instance = createAxiosInstance({ token, baseURL });

    return instance;
};
