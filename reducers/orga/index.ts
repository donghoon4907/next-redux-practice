import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { SimpleOrga } from '@models/orga';
import type { SearchOrgasSuccessPayload } from '@actions/hr/orga/search-orgas.action';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/orga/get-orgas.action';
import { GetLazyOrgasActionTypes } from '@actions/hr/orga/get-lazy-orgas.action';
import { GetOrgaActionTypes } from '@actions/hr/orga/get-orga.action';
import { SearchOrgasActionTypes } from '@actions/hr/orga/search-orgas.action';
import { DepartActionTypes } from '@actions/hr/common/set-depart.action';

export interface OrgaState {
    /**
     * 부서목록
     */
    orgas: CoreSelectOption[];
    /**
     * 부서상세요약
     */
    orga: SimpleOrga | null;
    /**
     * 영업조직 목록 - 검색
     */
    searchOrgas: SearchOrgasSuccessPayload;
    /**
     * 선택한 부서(조직)
     */
    selectedOrga: CoreSelectOption | null;
}

const initialState: OrgaState = {
    orgas: [],
    orga: null,
    searchOrgas: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    selectedOrga: null,
};

export const orgaReducer: Reducer<OrgaState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetLazyOrgasActionTypes.SUCCESS:
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case GetOrgaActionTypes.SUCCESS: {
                draft.orga = action.payload;
                break;
            }
            case SearchOrgasActionTypes.SUCCESS: {
                draft.searchOrgas = action.payload;
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
