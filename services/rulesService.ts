import { GetCalspecsRequestPayload } from '@actions/rule/get-calspecs';
import { GetRuleOrgasRequestPayload } from '@actions/rule/get-orgas';
import type { GetSudistsRequestPayload } from '@actions/rule/get-sudists';
import { getBackendAxios } from '@utils/axios/backend';
import { getInternalAxios } from '@utils/axios/internal';

export function getMakeableRates() {
    return getBackendAxios().get('/cals/rule/makeableRate');
}

export function getSudists(payload: GetSudistsRequestPayload) {
    return getBackendAxios().get(`/cals/rule/get_sudists/${payload.spe}`);
}

export function beforeGetCalspecs(payload: GetCalspecsRequestPayload) {
    return getInternalAxios().get('/api/get-calspecs', {
        params: {
            spe: payload.spe,
            wcode: payload.wcode,
        },
    });
}

export function getCalspecs(payload: GetCalspecsRequestPayload) {
    return getBackendAxios().get(
        `/commonapi/get_cal_spec/${payload.spe}/${payload.wcode}`,
    );
}

export function beforeGetRuleOrgas(payload: GetRuleOrgasRequestPayload) {
    return getInternalAxios().get('/api/get-rule-orgas', {
        params: {
            rate: payload.rate,
        },
    });
}

export function getRuleOrgas(payload: GetRuleOrgasRequestPayload) {
    return getBackendAxios().get(`/cals/rule/get_orga_idx/${payload.rate}`);
}

export function getGrades() {
    return getBackendAxios().get('/commonapi/get_long_grade');
}

export function getHwans() {
    return getBackendAxios().get('/cals/rule/sget_hwan_list');
}

const rootServices = {
    getMakeableRates,
    getSudists,
    beforeGetCalspecs,
    getCalspecs,
    beforeGetRuleOrgas,
    getRuleOrgas,
    getGrades,
    getHwans,
};

export default rootServices;
