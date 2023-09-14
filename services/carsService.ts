import type { CreateCarRequestPayload } from '@actions/contract/car/create-car.action';
import type { GetCarcodeRequestPayload } from '@actions/contract/car/get-carcode.action';
import type { GetCarRequestPayload } from '@actions/contract/car/get-car.action';
import type { UpdateCarRequestPayload } from '@actions/contract/car/update-car.action';
import { getQuarter } from 'date-fns';
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

const rootServices = {
    getCar,
    createCar,
    updateCar,
    calculateCar,
    getCarcode,
};

export default rootServices;
