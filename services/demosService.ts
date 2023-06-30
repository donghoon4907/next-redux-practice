import type { DemoRequestPayload } from '@actions/demo/demo.action';
import type { GetBasicPaymentsRequestPayload } from '@actions/long/get-basic-payments.action';
import type { GetOverridesRequestPayload } from '@actions/long/get-overrides.action';
import axios from 'axios';

export function requestDemo(payload: DemoRequestPayload) {
    return axios.get(`${process.env.DUMMYDATA_DOMAIN}/dummy`);
}

export function getBasicPayments(payload: GetBasicPaymentsRequestPayload) {
    return axios.get(`${process.env.DUMMYDATA_DOMAIN}/payments`);
}

export function getOverrides(payload: GetOverridesRequestPayload) {
    return axios.get(`${process.env.DUMMYDATA_DOMAIN}/overrides`);
}

const rootServices = {
    requestDemo,
    getBasicPayments,
    getOverrides,
};

export default rootServices;
