import type { Action } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';

export const GET_RULE_ORGAS_KEY = 'GET_RULE_ORGAS';

export const GetRuleOrgasActionTypes = {
    REQUEST: `${GET_RULE_ORGAS_KEY}_REQUEST`,
    SUCCESS: `${GET_RULE_ORGAS_KEY}_SUCCESS`,
    FAILURE: `${GET_RULE_ORGAS_KEY}_FAILURE`,
} as const;

export interface GetRuleOrgasRequestPayload {
    rate: string;
}

export type GetRuleOrgasSuccessPayload = CoreSelectOption[];

export interface GetRuleOrgasRequestAction extends Action<string> {
    payload: GetRuleOrgasRequestPayload;
}

export interface GetRuleOrgasSuccessAction extends Action<string> {
    payload: GetRuleOrgasSuccessPayload;
}

export function getRuleOrgasRequest(
    payload: GetRuleOrgasRequestPayload,
): GetRuleOrgasRequestAction {
    return {
        type: GetRuleOrgasActionTypes.REQUEST,
        payload,
    };
}

export function getRuleOrgasSuccess(
    payload: GetRuleOrgasSuccessPayload,
): GetRuleOrgasSuccessAction {
    return {
        type: GetRuleOrgasActionTypes.SUCCESS,
        payload,
    };
}
