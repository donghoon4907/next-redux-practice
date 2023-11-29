import type { CreateCarRequestPayload } from '@actions/car/create-car.action';
import type { GetCarcodeRequestPayload } from '@actions/car/get-carcode.action';
import type { GetCarRequestPayload } from '@actions/car/get-car.action';
import type { UpdateCarRequestPayload } from '@actions/car/update-car.action';
import type { GetCarsRequestPayload } from '@actions/car/get-cars.action';
import { getQuarter } from 'date-fns';
import { getExternalAxios } from '@utils/axios/external';
import { getBackendAxios } from '@utils/axios/backend';
import { GetEstimatesRequestPayload } from '@actions/car/get-estimates.action';
import { GetEstimateRequestPayload } from '@actions/car/get-estimate.action';

export function getCars({ page, nums, ...rest }: GetCarsRequestPayload) {
    return getBackendAxios().post(
        `/car/list/bo?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getCar({ idx }: GetCarRequestPayload) {
    return getBackendAxios().get(`/car/detail/${idx}`);
}

export function createCar(payload: CreateCarRequestPayload) {
    return getBackendAxios().post('/car/new', payload);
}

export function updateCar(payload: UpdateCarRequestPayload) {
    return getBackendAxios().post('/car/update', payload);
}

export function getCarcode({ idate, params = {} }: GetCarcodeRequestPayload) {
    const _idate = new Date(idate);
    // 보험개시년도
    const _year = _idate.getFullYear();
    // 보험개시분기
    const _quarter = getQuarter(_idate) + '분기';
    const qs = new URLSearchParams(params).toString();

    return getBackendAxios().get(
        `/estimate/carcode/${_year}/${encodeURIComponent(_quarter)}?${qs}`,
    );
}

export function getEstimates(payload: GetEstimatesRequestPayload) {
    return getBackendAxios().post('/estimate/slist', payload);
}

export function getEstimate({ idx }: GetEstimateRequestPayload) {
    return getBackendAxios().get(`/estimate/sdetail/${idx}`);
}

const rootServices = {
    getCars,
    getCar,
    createCar,
    updateCar,
    getCarcode,
    getEstimates,
    getEstimate,
};

export default rootServices;
