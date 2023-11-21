import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Guarantee } from '@models/guarantee';
import type { Code } from '@models/code';
import type { SimpleOrga } from '@models/orga';
import type { Product } from '@models/product';
import type { SearchUsersSuccessPayload } from '@actions/hr/search-users.action';
import type { SearchOrgasSuccessPayload } from '@actions/hr/search-orgas.action';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/hr/get-orgas.action';
import { GetLazyOrgasActionTypes } from '@actions/hr/get-lazy-orgas.action';
import { DepartActionTypes } from '@actions/hr/set-depart.action';
import { GetUsersActionTypes } from '@actions/hr/get-users.action';
import { GetCompaniesActionTypes } from '@actions/hr/get-companies.action';
// import { GetPermissionActionTypes } from '@actions/hr/get-permission.action';
// import { GetIpActionTypes } from '@actions/hr/get-ip.action';
import { PermissionActionTypes } from '@actions/hr/set-permission.action';
import { GuaranteeActionTypes } from '@actions/hr/set-guarantee.action';
import { CodeActionTypes } from '@actions/hr/set-code.action';
import { GetOrgaActionTypes } from '@actions/hr/get-orga.action';
import { GetUserActionTypes } from '@actions/hr/get-user.action';
import { GetProductsActionTypes } from '@actions/hr/get-products.action';
import { SearchUsersActionTypes } from '@actions/hr/search-users.action';
import { SearchOrgasActionTypes } from '@actions/hr/search-orgas.action';
import { GetLazyUsersActionTypes } from '@actions/hr/get-lazy-users.action';

export interface HrState {
    /**
     * 국내 전체 보험사목록
     */
    allCompanies: CoreSelectOption[];
    /**
     * 계약된 보험사목록
     */
    wrCompanies: CoreSelectOption[];
    /**
     * 공개 중인 장기계약 보험사목록
     */
    longViewCompanies: CoreSelectOption[];
    /**
     * 사용 중인 장기계약 보험사목록
     */
    longUseCompanies: CoreSelectOption[];
    /**
     * 공개 중인 자동차계약 보험사목록
     */
    carCompanies: CoreSelectOption[];
    /**
     * 사용 중인 자동차계약 보험사목록
     */
    carUseCompanies: CoreSelectOption[];
    /**
     * 공개 중인 일반계약 보험사목록
     */
    genCompanies: CoreSelectOption[];
    /**
     * 사용 중인 일반계약 보험사목록
     */
    genUseCompanies: CoreSelectOption[];
    /**
     * 은행목록
     */
    banks: CoreSelectOption[];
    /**
     * 기관목록
     */
    agencies: CoreSelectOption[];
    /**
     * 부서목록
     */
    orgas: CoreSelectOption[];
    /**
     * 부서상세요약
     */
    orga: SimpleOrga | null;
    /**
     * 영업가족 목록 - 간소화
     */
    users: CoreSelectOption[];
    /**
     * 영업가족 목록 - 검색
     */
    searchUsers: SearchUsersSuccessPayload;
    /**
     * 영업조직 목록 - 검색
     */
    searchOrgas: SearchOrgasSuccessPayload;
    /**
     * 영업가족 상세
     */
    user: any;
    /**
     * 선택한 부서(조직)
     */
    selectedOrga: CoreSelectOption | null;
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
    guarantees: Guarantee[];
    /**
     * 삭제된 보증 설정 목록
     */
    removedGuarantees: Guarantee[];
    /**
     * 보험사 코드 목록
     */
    codes: Code[];
    /**
     * 삭제된 보험사 코드 목록
     */
    removedCodes: Code[];
    /**
     * 보험사의 상품 목록
     */
    products: {
        data: Product[];
        wcode: string;
    };
}

const initialState: HrState = {
    allCompanies: [],
    wrCompanies: [],
    longViewCompanies: [],
    longUseCompanies: [],
    carCompanies: [],
    carUseCompanies: [],
    genCompanies: [],
    genUseCompanies: [],
    banks: [],
    agencies: [],
    orgas: [],
    orga: null,
    users: [],
    searchUsers: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    searchOrgas: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    user: null,
    selectedOrga: null,
    loggedInUser: null,
    // ip: '',
    guarantees: [],
    removedGuarantees: [],
    codes: [],
    removedCodes: [],
    products: {
        data: [],
        wcode: '',
    },
};

export const hrReducer: Reducer<HrState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetCompaniesActionTypes.SUCCESS: {
                if (action.payload.type === 'bank') {
                    draft.banks = action.payload.companies;
                } else if (action.payload.type === 'card') {
                } else if (action.payload.type === 'insu') {
                    draft.allCompanies = action.payload.companies;
                } else if (action.payload.type === 'long-view') {
                    draft.longViewCompanies = action.payload.companies;
                } else if (action.payload.type === 'car-view') {
                    draft.carCompanies = action.payload.companies;
                } else if (action.payload.type === 'gen-view') {
                    draft.genCompanies = action.payload.companies;
                } else if (action.payload.type === 'long-use') {
                    draft.longUseCompanies = action.payload.companies;
                } else if (action.payload.type === 'car-use') {
                    draft.carUseCompanies = action.payload.companies;
                } else if (action.payload.type === 'gen-use') {
                    draft.genUseCompanies = action.payload.companies;
                } else if (action.payload.type === 'board') {
                } else if (action.payload.type === 'woori') {
                    draft.wrCompanies = action.payload.companies;
                }

                break;
            }
            case GetLazyOrgasActionTypes.SUCCESS:
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case GetOrgaActionTypes.SUCCESS: {
                draft.orga = action.payload;
                break;
            }
            case GetLazyUsersActionTypes.SUCCESS:
            case GetUsersActionTypes.SUCCESS: {
                draft.users = action.payload;
                break;
            }
            case SearchUsersActionTypes.SUCCESS: {
                draft.searchUsers = action.payload;
                break;
            }
            case SearchOrgasActionTypes.SUCCESS: {
                draft.searchOrgas = action.payload;
                break;
            }
            case GetUserActionTypes.SUCCESS: {
                draft.user = action.payload;
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

                for (let i = 0; i < draft.guarantees.length; i++) {
                    if (draft.guarantees[i].index === index) {
                        draft.guarantees[i] = {
                            ...draft.guarantees[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case GuaranteeActionTypes.DELETE: {
                const findIndex = draft.guarantees.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.guarantees.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedGuarantees =
                            draft.removedGuarantees.concat(deleted);
                    }
                }

                break;
            }
            case CodeActionTypes.CREATE: {
                draft.codes = draft.codes.concat(action.payload);
                break;
            }
            case CodeActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.codes.length; i++) {
                    if (draft.codes[i].index === index) {
                        draft.codes[i] = {
                            ...draft.codes[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case CodeActionTypes.DELETE: {
                const findIndex = draft.codes.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.codes.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedCodes = draft.removedCodes.concat(deleted);
                    }
                }

                break;
            }
            case GetProductsActionTypes.SUCCESS: {
                draft.products.data = action.payload.data;

                draft.products.wcode = action.payload.wcode;

                break;
            }
            default:
                return state;
        }
    });
