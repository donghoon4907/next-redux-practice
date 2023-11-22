import type { Reducer } from 'redux';
import type { Product } from '@models/product';
import type { Pay } from '@models/pay';
import type { Baeseo } from '@models/baeseo';
import type { KeyValue } from '@models/keyValue';
import produce from 'immer';
import { ProductActionTypes } from '@actions/contract/set-product.action';
import { LoadedContractorActionTypes } from '@actions/contract/set-contractor.action';
import { PayActionTypes } from '@actions/contract/set-pay.action';
import { BaeseoActionTypes } from '@actions/contract/set-baeseo.action';
import { InfoProductActionTypes } from '@actions/contract/set-info-product.action';
import { InfoCustActionTypes } from '@actions/contract/set-info-cust.action';

export interface ContractState {
    /**
     * 선택한 상품명
     */
    selectedProduct: Product | null;
    /**
     * 선택된 계약자
     */
    loadedContract: any;
    /**
     * 납입실적 목록
     */
    pays: Pay[];
    /**
     * 삭제한 납입실적 목록
     */
    removedPays: Pay[];
    /**
     * 비유지/부활 목록
     */
    baeseos: Baeseo[];
    /**
     * 삭제한 비유지/부활 목록
     */
    removedBaeseos: Baeseo[];
    /**
     * 관리정보 목록
     */
    infoCusts: KeyValue[];
    /**
     * 선택한 관리정보
     */
    selectedInfoCust: KeyValue | null;
    /**
     * 기타계약정보 목록
     */
    infoProducts: KeyValue[];
    /**
     * 선택한 기타계약정보
     */
    selectedInfoProduct: KeyValue | null;
}

const initialState: ContractState = {
    selectedProduct: null,
    loadedContract: null,
    pays: [],
    removedPays: [],
    baeseos: [],
    removedBaeseos: [],
    infoCusts: [],
    selectedInfoCust: null,
    infoProducts: [],
    selectedInfoProduct: null,
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
            // 불러온 계약자 정보
            case LoadedContractorActionTypes.SUCCESS:
            // 선택한 계약자 정보
            case LoadedContractorActionTypes.UPDATE: {
                draft.loadedContract = action.payload;

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
            case BaeseoActionTypes.CREATE: {
                draft.baeseos = [action.payload, ...draft.baeseos];
                break;
            }
            case BaeseoActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.baeseos.length; i++) {
                    if (draft.baeseos[i].index === index) {
                        draft.baeseos[i] = {
                            ...draft.baeseos[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case BaeseoActionTypes.DELETE: {
                const findIndex = draft.baeseos.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.baeseos.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedBaeseos =
                            draft.removedBaeseos.concat(deleted);
                    }
                }

                break;
            }
            case InfoCustActionTypes.CREATE: {
                draft.infoCusts = draft.infoCusts.concat(action.payload);
                break;
            }
            case InfoCustActionTypes.SELECT: {
                draft.selectedInfoCust = action.payload;
                break;
            }
            case InfoCustActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.infoCusts.length; i++) {
                    if (draft.infoCusts[i].index === index) {
                        draft.infoCusts[i] = {
                            ...draft.infoCusts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InfoCustActionTypes.DELETE: {
                const findIndex = draft.infoCusts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.infoCusts.splice(findIndex, 1);

                    // if (deleted.idx) {
                    //     draft.removedPays = draft.removedPays.concat(deleted);
                    // }
                }

                break;
            }
            case InfoProductActionTypes.CREATE: {
                draft.infoProducts = draft.infoProducts.concat(action.payload);
                break;
            }
            case InfoProductActionTypes.SELECT: {
                draft.selectedInfoProduct = action.payload;
                break;
            }
            case InfoProductActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.infoProducts.length; i++) {
                    if (draft.infoProducts[i].index === index) {
                        draft.infoProducts[i] = {
                            ...draft.infoProducts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case InfoProductActionTypes.DELETE: {
                const findIndex = draft.infoProducts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.infoProducts.splice(findIndex, 1);

                    // if (deleted.idx) {
                    //     draft.removedPays = draft.removedPays.concat(deleted);
                    // }
                }

                break;
            }
            default:
                return state;
        }
    });
