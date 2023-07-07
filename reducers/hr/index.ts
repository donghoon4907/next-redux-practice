import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/get-orgas';
import { DepartActionTypes } from '@actions/hr/depart.action';
import { GetFcsActionTypes } from '@actions/hr/get-fcs';

export interface HrState {
    /**
     * 부서(조직) 조회 결과
     */
    orgas: CoreSelectOption[];
    /**
     * 영업가족 조회 결과
     */
    fcs: CoreSelectOption[];
    /**
     * 선택한 부서(조직)
     */
    selectedOrga: CoreSelectOption;
}

const initialState: HrState = {
    orgas: [],
    fcs: [],
    selectedOrga: {
        value: '',
        label: '',
    },
};

export const hrReducer: Reducer<HrState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case GetFcsActionTypes.SUCCESS: {
                draft.fcs = action.payload;
                break;
            }
            case DepartActionTypes.UPDATE: {
                draft.selectedOrga = action.payload;
                break;
            }
            default:
                return state;
        }
    });
