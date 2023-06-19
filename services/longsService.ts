import type { GetBasicPaymentsRequestPayload } from '@actions/long/get-basic-payments.action';
import type { GetOverridesRequestPayload } from '@actions/long/get-overrides.action';
import axios from 'axios';

export function getBasicPayments(payload: GetBasicPaymentsRequestPayload) {
    return axios.get('/long_basic_payment.json');
}

export function getOverrides(payload: GetOverridesRequestPayload) {
    return axios.get('/long_override.json');
}

const rootServices = {
    getBasicPayments,
    getOverrides,
};

export default rootServices;
