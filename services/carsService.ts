import type { CreateCarRequestPayload } from '@actions/contract/car/create.action';
import type { GetCarcodeRequestPayload } from '@actions/contract/car/get-carcode.action';
import type { GetCarRequestPayload } from '@actions/contract/car/get-car.action';
import type { UpdateCarRequestPayload } from '@actions/contract/car/update.action';
import type { GetCarsRequestPayload } from '@actions/contract/car/get-cars.action';
import { getQuarter } from 'date-fns';
import { getBackendAxios } from '@utils/axios/backend';
import { getExternalAxios } from '@utils/axios/external';
import { getInternalAxios } from '@utils/axios/internal';
import { GetEstimatesRequestPayload } from '@actions/contract/car/get-estimates.action';
import { GetEstimateRequestPayload } from '@actions/contract/car/get-estimate.action';
import { GetLazyEstimateRequestPayload } from '@actions/contract/car/get-lazy-estimate.action';

export function getCars({ page, nums, ...rest }: GetCarsRequestPayload) {
    return getBackendAxios().post(
        `/car/list/bo?page=${page}&nums=${nums}`,
        rest,
    );
}

export function getCar({ idx }: GetCarRequestPayload) {
    return getBackendAxios().get(`/car/detail/${idx}`);
}

export function beforeCreateCar(payload: CreateCarRequestPayload) {
    return getInternalAxios().post('/api/create-car', payload);
}

export function createCar(payload: CreateCarRequestPayload) {
    return getBackendAxios().post('/car/new', payload);
}

export function beforeUpdateCar(payload: UpdateCarRequestPayload) {
    return getInternalAxios().post('/api/update-car', payload);
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

export function beforeGetCarcode(payload: GetCarcodeRequestPayload) {
    return getInternalAxios().get('/api/get-carcode', {
        params: payload,
    });
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

export function beforeGetEstimates(payload: GetEstimatesRequestPayload) {
    return getInternalAxios().get('/api/get-estimates', {
        params: payload,
    });
}

export function getEstimates(payload: GetEstimatesRequestPayload) {
    return getBackendAxios().post('/estimate/slist', payload);
}

export function beforeGetEstimate(payload: GetLazyEstimateRequestPayload) {
    return getInternalAxios().get('/api/get-estimate', {
        params: payload,
    });
}

export function getEstimate({ idx }: GetEstimateRequestPayload) {
    return getBackendAxios().get(`/estimate/sdetail/${idx}`);
}

const rootServices = {
    getCars,
    getCar,
    beforeCreateCar,
    createCar,
    beforeUpdateCar,
    updateCar,
    calculateCar,
    beforeGetCarcode,
    getCarcode,
    beforeGetEstimates,
    getEstimates,
    beforeGetEstimate,
    getEstimate,
};

export default rootServices;
