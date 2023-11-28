import type { GetCompaniesRequestPayload } from '@actions/hr/get-companies.action';
import type { GetCompanyRegNumRequestPayload } from '@actions/hr/get-company-regnum.action';
import type { GetProductsRequestPayload } from '@actions/hr/get-products.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getCompanies(payload: GetCompaniesRequestPayload) {
    return getBackendAxios().get(`/finance/${payload}`);
}

export function getCompanyRegNum(payload: GetCompanyRegNumRequestPayload) {
    return getBackendAxios().get(`/customer/ckCompanyCust/${payload.num}`);
}

export function getProducts(payload: GetProductsRequestPayload) {
    return getBackendAxios().get(
        `/product/${payload.spe}/${payload.wcode}${
            payload.type ? `?type=${payload.type}` : ''
        }`,
    );
}

const rootServices = {
    getCompanies,
    getCompanyRegNum,
    getProducts,
};

export default rootServices;
