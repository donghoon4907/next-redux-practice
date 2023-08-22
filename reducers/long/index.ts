import type { Reducer } from 'redux';
import type { Product } from '@models/product';
import type { Pay } from '@models/pay';
import type { Endorsement } from '@models/endorsement';
import type { InsuredPerson } from '@models/insured-person';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
// import { LongEtcUpdateActionTypes } from '@actions/long/set-long-etc.action';
import { LongProductActionTypes } from '@actions/long/set-long-product.action';
import { PayActionTypes } from '@actions/long/set-pay.action';
import { EndorsementActionTypes } from '@actions/long/set-endorsement.action';
import { InsuredPersonActionTypes } from '@actions/long/set-insured-person.action';
import {
    LoadedContractorActionTypes,
    LoadedInsuredPersonActionTypes,
} from '@actions/long/set-loaded-customer.action';

export interface LongState {
    /**
     * 장기계약 목록
     */
    longs: GetLongsSuccessPayload;
    /**
     * 장기계약 상세
     */
    long: any;
    /**
     * 선택한 상품명
     */
    selectedProduct: Product | null;
    /**
     * 납입실적 목록
     */
    pays: Pay[];
    /**
     * 삭제한 납입실적 목록
     */
    removedPays: Pay[];
    /**
     * 배서 목록
     */
    endorsements: Endorsement[];
    /**
     * 삭제한 배서 목록
     */
    removedEndorsements: Endorsement[];
    /**
     * 피보험자 목록
     */
    insuredPeople: InsuredPerson[];
    /**
     * 삭제한 피보험자 목록
     */
    removedInsuredPeople: InsuredPerson[];
    /**
     * 불러온 계약자
     */
    loadedContract: any;
    /**
     * 불러온 피보험자
     */
    loadedInsuredPerson: any;
}

const initialState: LongState = {
    longs: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    long: null,
    // etcs: [],
    selectedProduct: null,
    pays: [
        // {
        //     index: 0,
        //     checked: false,
        //     idx: 3102,
        //     dist: '신규',
        //     paydate: '2023-06-14',
        //     whoi: 1,
        //     pay: 78000,
        //     cycle: '월납',
        //     confirm: 'Y',
        //     hmonth: '2023-06',
        //     distkind: '응당',
        //     paykind: '',
        //     insert: 'system 2023-07-04 17:46',
        // },
    ],
    removedPays: [],
    endorsements: [
        {
            index: 0,
            checked: false,
            idx: 3102,
            dist: '해지',
            paydate: '2023-06-14',
            gdate: '2023-06-01',
            whoi: 1,
            pay_before: 78000,
            pay_after: 78000,
            tp_before: 78000,
            tp_after: 78000,
            balance: 78000,
            confirm: 'Y',
            insert: 'system 2023-07-04 17:46',
        },
    ],
    removedEndorsements: [],
    insuredPeople: [],
    removedInsuredPeople: [],
    loadedContract: null,
    loadedInsuredPerson: null,
};

export const longReducer: Reducer<LongState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetLongsActionTypes.SUCCESS: {
                draft.longs = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            // case LongEtcUpdateActionTypes.UPDATE: {
            //     draft.long.etcs[action.payload.field] = action.payload.content;

            //     break;
            // }
            case LongProductActionTypes.UPDATE: {
                draft.selectedProduct = action.payload;

                break;
            }
            case PayActionTypes.CREATE: {
                draft.pays = draft.pays.concat(action.payload);
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
            case EndorsementActionTypes.CREATE: {
                draft.endorsements = draft.endorsements.concat(action.payload);
                break;
            }
            case EndorsementActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.endorsements.length; i++) {
                    if (draft.endorsements[i].index === index) {
                        draft.endorsements[i] = {
                            ...draft.endorsements[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case EndorsementActionTypes.DELETE: {
                const findIndex = draft.endorsements.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.endorsements.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedEndorsements =
                            draft.removedEndorsements.concat(deleted);
                    }
                }

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
            case LoadedContractorActionTypes.UPDATE: {
                draft.loadedContract = action.payload;

                break;
            }
            case LoadedInsuredPersonActionTypes.UPDATE: {
                draft.loadedInsuredPerson = action.payload;

                break;
            }
            default:
                return state;
        }
    });
