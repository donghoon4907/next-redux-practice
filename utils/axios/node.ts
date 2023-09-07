import type { AxiosInstance } from 'axios';
import { createAxiosInstance } from '.';

let instance: AxiosInstance | null = null;

const baseURL = process.env.NODE_DOMAIN || '';

// 싱글톤 객체를 가져오는 함수
export const getNodeAxios = () => {
    // 인스턴스가 이미 존재하는 경우, 기존 인스턴스 반환
    if (instance) {
        return instance;
    }

    // 인스턴스가 없는 경우, 새로운 인스턴스 생성
    instance = createAxiosInstance({ baseURL });

    return instance;
};
