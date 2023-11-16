import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import produce from 'immer';
import { GetMakeableRatesActionTypes } from '@actions/rule/get-makeable-rates';
import { GetSudistsActionTypes } from '@actions/rule/get-sudists';
import { GetCalspecsActionTypes } from '@actions/rule/get-calspecs';
import { GetRuleOrgasActionTypes } from '@actions/rule/get-orgas';
import { GetGradesActionTypes } from '@actions/rule/get-grades';
import { GetHwansActionTypes } from '@actions/rule/get-hwans';

export interface RuleState {
    /** 생성가능한 등급 */
    makeableRates: CoreSelectOption[];
    /** 수수료항목 */
    sudists: CoreSelectOption[];
    /** 정산종목 */
    calspecs: CoreSelectOption[];
    /** 조직 */
    orgas: CoreSelectOption[];
    /** 등급 */
    grades: CoreSelectOption[];
    /** 환수제도 */
    hwans: CoreSelectOption[];
}

const initialState: RuleState = {
    makeableRates: [],
    sudists: [],
    calspecs: [],
    orgas: [],
    grades: [],
    hwans: [],
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
            case GetCalspecsActionTypes.SUCCESS: {
                draft.calspecs = action.payload;

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
            default:
                return state;
        }
    });
