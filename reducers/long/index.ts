import type { Reducer } from 'redux';
import type { GetLongsSuccessPayload } from '@actions/contract/long/get-longs.action';
import type { GetLongSilsSuccessPayload } from '@actions/contract/long/get-long-sils.action';
import type { GetLongBuhwalsSuccessPayload } from '@actions/contract/long/get-long-buhwals.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/contract/long/get-longs.action';
import { GetLongActionTypes } from '@actions/contract/long/get-long.action';
import { GetLongFieldsActionTypes } from '@actions/contract/long/get-long-fields.action';
import { GetLongSilsActionTypes } from '@actions/contract/long/get-long-sils.action';
import {
    GetLongSilhyosActionTypes,
    GetLongSilhyosSuccessPayload,
} from '@actions/contract/long/get-long-silhyos.action';
import { GetLongBuhwalsActionTypes } from '@actions/contract/long/get-long-buhwals.action';

export interface LongState {
    /**
     * 장기계약 목록
     */
    longs: GetLongsSuccessPayload;
    /**
     * 장기실적 목록
     */
    longSils: GetLongSilsSuccessPayload;
    /**
     * 장기실효계약 목록
     */
    longSilhyos: GetLongSilhyosSuccessPayload;
    /**
     * 부활계약 목록
     */
    longBuhwals: GetLongBuhwalsSuccessPayload;
    /**
     * 장기계약 상세
     */
    long: any;
    /**
     * 장기테이블 필드 목록
     */
    fields: Array<any>;
}

const initialState: LongState = {
    longs: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longSils: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longSilhyos: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    longBuhwals: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    long: null,
    fields: [],
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
            case GetLongSilsActionTypes.SUCCESS: {
                draft.longSils = action.payload;

                break;
            }
            case GetLongSilhyosActionTypes.SUCCESS: {
                draft.longSilhyos = action.payload;

                break;
            }
            case GetLongBuhwalsActionTypes.SUCCESS: {
                draft.longBuhwals = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            case GetLongFieldsActionTypes.SUCCESS: {
                draft.fields = action.payload;

                break;
            }

            default:
                return state;
        }
    });
