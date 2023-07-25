import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Guarantee } from '@models/guarantee';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/get-orgas';
import { DepartActionTypes } from '@actions/hr/set-depart.action';
import { GetUsersActionTypes } from '@actions/hr/get-users';
import { GetCompaniesActionTypes } from '@actions/hr/get-companies';
// import { GetPermissionActionTypes } from '@actions/hr/get-permission.action';
// import { GetIpActionTypes } from '@actions/hr/get-ip.action';
import { PermissionActionTypes } from '@actions/hr/set-permission.action';
import { GetBanksActionTypes } from '@actions/hr/get-banks';
import { GuaranteeActionTypes } from '@actions/hr/set-guarantee.action';
import { GetAgenciesActionTypes } from '@actions/hr/get-agencys';

export interface HrState {
    /**
     * 보험사목록
     */
    companies: CoreSelectOption[];
    /**
     * 은행목록
     */
    banks: CoreSelectOption[];
    /**
     * 기관목록
     */
    agencies: CoreSelectOption[];
    /**
    /**
     * 부서목록
     */
    orgas: CoreSelectOption[];
    /**
     * 영업가족 목록
     */
    users: CoreSelectOption[];
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
    /**
     * 보증 설정 목록
     */
    guarantees: Partial<Guarantee>[];
}

const initialState: HrState = {
    companies: [],
    banks: [],
    agencies: [],
    orgas: [],
    users: [],
    selectedOrga: {
        value: '',
        label: '',
    },
    loggedInUser: null,
    // ip: '',
    guarantees: [
        {
            kind: '이행보증',
            g_money: 5000,
            remark: '100-000-202105170046',
            sdate: '2022-12-31',
            edate: '2024-12-31',
            redate: '2023-01-01',
            agency_com: '서울보증보험',
        },
        {
            kind: '적립금',
            g_money: 5000,
            accumulate_goal: 50000,
            accumulate_status: '적립중',
            accumulate_type: 1,
            accumulate_rate: 5,
        },
    ],
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
            case GetBanksActionTypes.SUCCESS: {
                draft.banks = action.payload;
                break;
            }
            case GetAgenciesActionTypes.SUCCESS: {
                draft.agencies = action.payload;
                break;
            }
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case GetUsersActionTypes.SUCCESS: {
                draft.users = action.payload;
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
            case GuaranteeActionTypes.CREATE: {
                draft.guarantees = draft.guarantees.concat(action.payload);
                break;
            }
            case GuaranteeActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                draft.guarantees[index] = rest;
                break;
            }
            case GuaranteeActionTypes.DELETE: {
                draft.guarantees.splice(action.payload.index, 1);
                break;
            }
            default:
                return state;
        }
    });
