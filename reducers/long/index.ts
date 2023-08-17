import type { Reducer } from 'redux';
import type { Product } from '@models/product';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
// import { LongEtcUpdateActionTypes } from '@actions/long/set-long-etc.action';
import { LongProductActionTypes } from '@actions/long/set-long-product.action';

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
     * 기타항목?
     */
    // etcs: Array<any>;
    /**
     * 선택한 상품명
     */
    selectedProduct: Product | null;
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
            default:
                return state;
        }
    });
