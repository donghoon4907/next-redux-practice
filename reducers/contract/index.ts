import type { Reducer } from 'redux';
import type { Product } from '@models/product';
import type { InsuredPerson } from '@models/insured-person';
import produce from 'immer';
import { ProductActionTypes } from '@actions/contract/set-product.action';
import {
    LoadedContractorActionTypes,
    LoadedInsuredPersonActionTypes,
} from '@actions/contract/set-contractor.action';
import { InsuredPersonActionTypes } from '@actions/contract/set-insured-person.action';

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
    loadedInsuredPerson: any;
    /**
     * 피보험자 목록
     */
    insuredPeople: InsuredPerson[];
    /**
     * 삭제한 피보험자 목록
     */
    removedInsuredPeople: InsuredPerson[];
}

const initialState: ContractState = {
    selectedProduct: null,
    loadedContract: null,
    loadedInsuredPerson: null,
    insuredPeople: [],
    removedInsuredPeople: [],
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
            case LoadedContractorActionTypes.UPDATE: {
                draft.loadedContract = action.payload;

                break;
            }
            case LoadedInsuredPersonActionTypes.UPDATE: {
                draft.loadedInsuredPerson = action.payload;

                break;
            }
            case InsuredPersonActionTypes.CREATE: {
                draft.insuredPeople = draft.insuredPeople.concat(
                    action.payload,
                );
                break;
            }
            case InsuredPersonActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.insuredPeople.length; i++) {
                    if (draft.insuredPeople[i].index === index) {
                        draft.insuredPeople[i] = {
                            ...draft.insuredPeople[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InsuredPersonActionTypes.DELETE: {
                const findIndex = draft.insuredPeople.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.insuredPeople.splice(findIndex, 1);

                    if (deleted.p_idx) {
                        draft.removedInsuredPeople =
                            draft.removedInsuredPeople.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
