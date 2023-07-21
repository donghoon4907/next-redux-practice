import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/get-orgas';
import { DepartActionTypes } from '@actions/hr/set-depart.action';
import { GetFcsActionTypes } from '@actions/hr/get-fcs';
import { GetCompaniesActionTypes } from '@actions/hr/get-companies';
// import { GetPermissionActionTypes } from '@actions/hr/get-permission.action';
// import { GetIpActionTypes } from '@actions/hr/get-ip.action';
import { PermissionActionTypes } from '@actions/hr/set-permission.action';

export interface HrState {
    /**
     * 보험사 조회 결과
     */
    companies: CoreSelectOption[];
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
    /**
     * 로그인한 사용자 정보
     */
    loggedInUser: any;
    /**
     * 사용자 환경의 IP
     */
    // ip: string;
}

const initialState: HrState = {
    companies: [],
    orgas: [],
    fcs: [],
    selectedOrga: {
        value: '',
        label: '',
    },
    loggedInUser: null,
    // ip: '',
};

export const hrReducer: Reducer<HrState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetCompaniesActionTypes.SUCCESS: {
                draft.companies = action.payload;
                break;
            }
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
            // case GetPermissionActionTypes.SUCCESS: {
            //     draft.loggedInUser = action.payload;
            //     break;
            // }
            // case GetIpActionTypes.SUCCESS: {
            //     draft.ip = action.payload.ip;
            //     break;
            // }
            case PermissionActionTypes.UPDATE: {
                draft.loggedInUser = action.payload;
                break;
            }
            default:
                return state;
        }
    });
