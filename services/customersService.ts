import type { CreateCustomerRequestPayload } from '@actions/customer/create-customer.action';
import type { GetCustomerRequestPayload } from '@actions/customer/get-customer';
import { GetUserCustomersRequestPayload } from '@actions/customer/get-user-customers';
import type { UpdateCustomerRequestPayload } from '@actions/customer/update-customer.action';
import axios from 'axios';
import { getBackendAxios } from '@utils/axios/backend';

export function createCustomer(payload: CreateCustomerRequestPayload) {
    return getBackendAxios().post('/customer/new', payload);
}

export function updateCustomer(payload: UpdateCustomerRequestPayload) {
    return getBackendAxios().post('/customer/update', payload);
}

export function getCustomer(payload: GetCustomerRequestPayload) {
    return getBackendAxios().get(`/customer/detail/${payload.idx}`);
}

export function lazyGetCustomer(payload: GetCustomerRequestPayload) {
    return axios.get('/api/get-customer', {
        params: {
            idx: payload.idx,
        },
    });
}

export function beforeGetUserCustomers(
    payload: GetUserCustomersRequestPayload,
) {
    return axios.get('/api/get-user-customers', {
        params: {
            username: encodeURIComponent(payload.username),
            userid: payload.userid,
        },
    });
}

export function getUserCustomers(payload: GetUserCustomersRequestPayload) {
    return getBackendAxios().get(
        `/commonapi/cust/getCustList/${payload.username}/${payload.userid}`,
    );
}

const rootServices = {
    createCustomer,
    getCustomer,
    lazyGetCustomer,
    updateCustomer,
    beforeGetUserCustomers,
    getUserCustomers,
};

export default rootServices;
