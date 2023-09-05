import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import type { GetCarRequestPayload } from '@actions/contract/car/get-car.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getCar({ idx }: GetCarRequestPayload) {
    return getBackendAxios().get(`/car/detail/${idx}`);
}

export function createCar(payload: CreateCarRequestPayload) {
    return getBackendAxios().post('/car/new', payload);
}

const rootServices = {
    getCar,
    createCar,
};

export default rootServices;
