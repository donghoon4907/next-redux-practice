import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { Guarantee } from '@models/guarantee';
import type { Code } from '@models/code';
import type { Product } from '@models/product';
import produce from 'immer';
import { GetCompaniesActionTypes } from '@actions/hr/common/get-companies.action';
import { GuaranteeActionTypes } from '@actions/hr/common/set-guarantee.action';
import { CodeActionTypes } from '@actions/hr/common/set-code.action';
import { GetProductsActionTypes } from '@actions/hr/common/get-products.action';

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
