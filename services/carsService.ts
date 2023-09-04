import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import { getBackendAxios } from '@utils/axios/backend';

export function createCar(payload: CreateCarRequestPayload) {
    return getBackendAxios().post('/car/new', payload);
}

const rootServices = {
    createCar,
};

export default rootServices;
