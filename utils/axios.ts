import type { CookieValueTypes } from 'cookies-next';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getCookie } from 'cookies-next';

let instance: AxiosInstance | null = null;

function createInstance(token?: CookieValueTypes): AxiosInstance {
    const newInstance = axios.create({
        baseURL: process.env.BACKEND_DOMAIN,
        // timeout: 5000,
        headers: {},
    });

    // 서버에서 요청 시 기본 헤더를 설정
    let authorization = 'Bearer ';
    if (token) {
        authorization += token;
    } else {
        authorization += 'Non-members';
    }

    newInstance.defaults.headers.common['authorization'] = authorization;

    // 클라이언트에서 요청을 보내기 전에 실행되는 인터셉터 설정
    newInstance.interceptors.request.use((config: AxiosRequestConfig) => {
        const token = getCookie(process.env.COOKIE_TOKEN_KEY || '');

        let authorization = 'Bearer ';
        if (token) {
            authorization += token;
        } else {
            authorization += 'Non-members';
        }
        return config;
    });

    return newInstance;
}

// 싱글톤 객체를 가져오는 함수
export const getAxios = () => {
    // 인스턴스가 이미 존재하는 경우, 기존 인스턴스 반환
    if (instance) {
        return instance;
    }

    // 인스턴스가 없는 경우, 새로운 인스턴스 생성
    instance = createInstance();

    return instance;
};

export const initialzeAxios = (token: CookieValueTypes) => {
    instance = createInstance(token);

    return instance;
};
