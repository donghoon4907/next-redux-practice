import type { Reducer } from 'redux';
import type { Product } from '@models/product';
import type { Insured } from '@models/insured';
import type { Pay } from '@models/pay';
import produce from 'immer';
import { ProductActionTypes } from '@actions/contract/common/set-product.action';
import {
    LoadedContractorActionTypes,
    LoadedInsuredActionTypes,
} from '@actions/contract/common/set-contractor.action';
import { InsuredActionTypes } from '@actions/contract/common/set-insured.action';
import { PayActionTypes } from '@actions/contract/common/set-pay.action';
import { GetCustomerActionTypes } from '@actions/customer/get-customer';

export interface ContractState {
    /**
     * 선택한 상품명
     */
    selectedProduct: Product | null;
    /**
     * 불러온 계약자
     */
    loadedContract: any;
    /**
     * 불러온 피보험자
     */
    loadedInsured: any;
    /**
     * 피보험자 목록
     */
    insureds: Insured[];
    /**
     * 삭제한 피보험자 목록
     */
    removedInsureds: Insured[];
    /**
     * 납입실적 목록
     */
    pays: Pay[];
    /**
     * 삭제한 납입실적 목록
     */
    removedPays: Pay[];
}

const initialState: ContractState = {
    selectedProduct: null,
    loadedContract: null,
    loadedInsured: null,
    insureds: [],
    removedInsureds: [],
    pays: [],
    removedPays: [],
};

export const contractReducer: Reducer<ContractState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ProductActionTypes.UPDATE: {
                draft.selectedProduct = action.payload;

                break;
            }
            // customer api 호출으로 얻어온 계약자 정보
            case LoadedContractorActionTypes.SUCCESS: {
                draft.loadedContract = action.payload;

                break;
            }
            // 고객 검색결과로 얻어온 계약자 정보
            case LoadedContractorActionTypes.UPDATE: {
                draft.loadedContract = action.payload;

                break;
            }
            case LoadedInsuredActionTypes.UPDATE: {
                draft.loadedInsured = action.payload;

                break;
            }
            case InsuredActionTypes.CREATE: {
                draft.insureds = draft.insureds.concat(action.payload);
                break;
            }
            case InsuredActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.insureds.length; i++) {
                    if (draft.insureds[i].index === index) {
                        draft.insureds[i] = {
                            ...draft.insureds[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InsuredActionTypes.DELETE: {
                const findIndex = draft.insureds.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.insureds.splice(findIndex, 1);

                    if (deleted.p_idx) {
                        draft.removedInsureds =
                            draft.removedInsureds.concat(deleted);
                    }
                }

                break;
            }
            case PayActionTypes.CREATE: {
                draft.pays = [action.payload, ...draft.pays];
                break;
            }
            case PayActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.pays.length; i++) {
                    if (draft.pays[i].index === index) {
                        draft.pays[i] = {
                            ...draft.pays[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case PayActionTypes.DELETE: {
                const findIndex = draft.pays.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.pays.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedPays = draft.removedPays.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
