import type { GetCalspecsRequestPayload } from '@actions/rule/get-calspecs';
import type { GetRuleOrgasRequestPayload } from '@actions/rule/get-orgas';
import type { GetSudistsRequestPayload } from '@actions/rule/get-sudists';
import type { CreateLongRuleRequestPayload } from '@actions/rule/long/create.action';
import { getBackendAxios } from '@utils/axios/backend';

export function getMakeableRates() {
    return getBackendAxios().get('/cals/rule/makeableRate');
}

export function getSudists(payload: GetSudistsRequestPayload) {
    return getBackendAxios().get(`/cals/rule/get_sudists/${payload.spe}`);
}

export function getCalspecs(payload: GetCalspecsRequestPayload) {
    return getBackendAxios().get(
        `/commonapi/get_cal_spec/${payload.spe}/${payload.wcode}`,
    );
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

export function createLongRule(payload: CreateLongRuleRequestPayload) {
    return getBackendAxios().post('/cals/rule/long/new', payload);
}

const rootServices = {
    getMakeableRates,
    getSudists,
    getCalspecs,
    getRuleOrgas,
    getGrades,
    getHwans,
    createLongRule,
};

export default rootServices;
