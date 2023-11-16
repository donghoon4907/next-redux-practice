import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Rule } from '@models/rule';
import produce from 'immer';
import { GetMakeableRatesActionTypes } from '@actions/rule/get-makeable-rates';
import { GetSudistsActionTypes } from '@actions/rule/get-sudists';
import { GetRuleOrgasActionTypes } from '@actions/rule/get-orgas';
import { GetGradesActionTypes } from '@actions/rule/get-grades';
import { GetHwansActionTypes } from '@actions/rule/get-hwans';
import { RuleActionTypes } from '@actions/rule/set-rule.action';

export interface RuleState {
    /** 생성가능한 등급 */
    makeableRates: CoreSelectOption[];
    /** 수수료항목 */
    sudists: CoreSelectOption[];
    /** 조직 */
    orgas: CoreSelectOption[];
    /** 등급 */
    grades: CoreSelectOption[];
    /** 환수제도 */
    hwans: CoreSelectOption[];
    /** 규정목록 */
    rules: Rule[];
    /**
     * 삭제한 규정목록
     */
    removedRules: Rule[];
}

const initialState: RuleState = {
    makeableRates: [],
    sudists: [],
    orgas: [],
    grades: [],
    hwans: [],
    rules: [],
    removedRules: [],
};

export const ruleReducer: Reducer<RuleState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetMakeableRatesActionTypes.SUCCESS: {
                draft.makeableRates = action.payload;

                break;
            }
            case GetSudistsActionTypes.SUCCESS: {
                draft.sudists = action.payload;

                break;
            }
            case GetRuleOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;

                break;
            }
            case GetGradesActionTypes.SUCCESS: {
                draft.grades = action.payload;

                break;
            }
            case GetHwansActionTypes.SUCCESS: {
                draft.hwans = action.payload;

                break;
            }
            case RuleActionTypes.CREATE: {
                draft.rules = draft.rules.concat(action.payload);

                break;
            }
            case RuleActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.rules.length; i++) {
                    if (draft.rules[i].index === index) {
                        draft.rules[i] = {
                            ...draft.rules[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case RuleActionTypes.DELETE: {
                const findIndex = draft.rules.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.rules.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedRules = draft.removedRules.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
