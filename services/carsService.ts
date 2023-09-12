import { CalculateCarRequestPayload } from '@actions/contract/car/calculate-car.action';
import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import type { GetCarRequestPayload } from '@actions/contract/car/get-car.action';
import type { UpdateCarRequestPayload } from '@actions/contract/car/update-car.action';
import { getBackendAxios } from '@utils/axios/backend';
import { getExternalAxios } from '@utils/axios/external';

export function getCar({ idx }: GetCarRequestPayload) {
    return getBackendAxios().get(`/car/detail/${idx}`);
}

export function createCar(payload: CreateCarRequestPayload) {
    return getBackendAxios().post('/car/new', payload);
}

export function updateCar(payload: UpdateCarRequestPayload) {
    return getBackendAxios().post('/car/update', payload);
}

export function calculateCar(payload: FormData) {
    return getExternalAxios().post(
        'http://cal.insnara.co.kr/estimate/outer_test_woori.asp',
        payload,
        {
            headers: {
                Accept: 'text/html',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    );
}

const rootServices = {
    getCar,
    createCar,
    updateCar,
    calculateCar,
};

export default rootServices;
