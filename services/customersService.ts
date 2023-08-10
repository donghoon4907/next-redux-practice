import type { CreateCustomerRequestPayload } from '@actions/customer/create-customer.action';
import { getBackendAxios } from '@utils/axios/backend';

export function createCustomer(payload: CreateCustomerRequestPayload) {
    return getBackendAxios().post('/customer/new', payload);
}

const rootServices = {
    createCustomer,
};

export default rootServices;
