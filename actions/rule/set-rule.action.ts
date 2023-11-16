import type { Action } from 'redux';
import type { Rule } from '@models/rule';

export const RULE_KEY = 'WR-RULE';

export const RuleActionTypes = {
    CREATE: `CREATE_${RULE_KEY}`,
    UPDATE: `UPDATE_${RULE_KEY}`,
    DELETE: `DELETE_${RULE_KEY}`,
} as const;

export interface CreateRuleRuleload extends Rule {}

export interface UpdateRuleRuleload extends Partial<CreateRuleRuleload> {}

export interface DeleteRuleRuleload {
    index: number;
}

export interface CreateRuleAction extends Action<string> {
    payload: CreateRuleRuleload;
}

export interface UpdateRuleAction extends Action<string> {
    payload: UpdateRuleRuleload;
}

export interface DeleteRuleAction extends Action<string> {
    payload: DeleteRuleRuleload;
}

export function createRule(payload: CreateRuleRuleload): CreateRuleAction {
    return {
        type: RuleActionTypes.CREATE,
        payload,
    };
}

export function updateRule(payload: UpdateRuleRuleload): UpdateRuleAction {
    return {
        type: RuleActionTypes.UPDATE,
        payload,
    };
}

export function deleteRule(payload: DeleteRuleRuleload): DeleteRuleAction {
    return {
        type: RuleActionTypes.DELETE,
        payload,
    };
}
