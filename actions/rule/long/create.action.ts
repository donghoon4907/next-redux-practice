import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Rule } from '@models/rule';

export const CREATE_LONG_RULE_KEY = 'CREATE_LONG_RULE';

export const CreateLongRuleActionTypes = {
    REQUEST: `${CREATE_LONG_RULE_KEY}_REQUEST`,
    SUCCESS: `${CREATE_LONG_RULE_KEY}_SUCCESS`,
    FAILURE: `${CREATE_LONG_RULE_KEY}_FAILURE`,
} as const;

export interface CreateLongRuleRequestPayload extends CorePayload {
    // 장기지급제도명
    rule_name: string;
    // 장기지급제도 적용 조직등급
    rule_rate?: string;
    // 장기지급제도 적용 조직
    orga_idx?: string;
    // 구간 규정 여부
    grade?: boolean;
    // 구간 등급
    grade_rate?: string;
    // 환수 제도
    hwan_idx?: string;
    // 사용 유무
    use?: boolean;
    // 등록자
    insert_userid: string;
    // 규정
    long_content: Rule[];
}

export interface CreateLongRuleRequestAction extends Action<string> {
    payload: CreateLongRuleRequestPayload;
}

export interface CreateLongRuleSuccessAction extends Action<string> {}

export function createLongRuleRequest(
    payload: CreateLongRuleRequestPayload,
): CreateLongRuleRequestAction {
    return {
        type: CreateLongRuleActionTypes.REQUEST,
        payload,
    };
}

export function createLongRuleSuccess(): CreateLongRuleSuccessAction {
    return {
        type: CreateLongRuleActionTypes.SUCCESS,
    };
}
