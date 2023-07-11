import type { Reducer } from 'redux';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
// import { GetBasicPaymentsActionTypes } from '@actions/long/get-basic-payments.action';
// import { GetOverridesActionTypes } from '@actions/long/get-overrides.action';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
import { UpdateEtcActionTypes } from '@actions/long/update-etc.action';

export interface LongState {
    // basicPayments: {
    //     fields: any[];
    //     data: any[];
    //     total: any;
    // };
    // overrides: {
    //     fields: any[];
    //     data: any[];
    //     total: any;
    // };
    longs: GetLongsSuccessPayload;
    long: any;
}

const initialState: LongState = {
    // basicPayments: {
    //     fields: [],
    //     data: [],
    //     total: 0,
    // },
    // overrides: {
    //     fields: [],
    //     data: [],
    //     total: 0,
    // },
    longs: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    long: null,
};

export const longReducer: Reducer<LongState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            // case GetBasicPaymentsActionTypes.SUCCESS: {
            //     draft.basicPayments = action.payload;

            //     break;
            // }
            // case GetOverridesActionTypes.SUCCESS: {
            //     draft.overrides = action.payload;

            //     break;
            // }
            case GetLongsActionTypes.SUCCESS: {
                draft.longs = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            case UpdateEtcActionTypes.UPDATE: {
                draft.long.etcs[action.payload.field] = action.payload.content;

                break;
            }
            default:
                return state;
        }
    });
