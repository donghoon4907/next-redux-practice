import type { Reducer } from 'redux';
import produce from 'immer';
import { GetBasicPaymentsActionTypes } from '@actions/long/get-basic-payments.action';
import { GetOverridesActionTypes } from '@actions/long/get-overrides.action';
import {
    GetLongsActionTypes,
    GetLongsRequestPayload,
} from '@actions/long/get-longs.action';
import { Response } from '@models/response';
import { GetLongActionTypes } from '@actions/long/get-long.action';

export interface LongState {
    basicPayments: {
        fields: any[];
        data: any[];
        total: any;
    };
    overrides: {
        fields: any[];
        data: any[];
        total: any;
    };
    longs: Response & {
        lastPayload: GetLongsRequestPayload | null;
    };
    long: any;
}

const initialState: LongState = {
    basicPayments: {
        fields: [],
        data: [],
        total: 0,
    },
    overrides: {
        fields: [],
        data: [],
        total: 0,
    },
    longs: {
        fields: [],
        rows: [],
        total: 0,
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
            case GetBasicPaymentsActionTypes.SUCCESS: {
                draft.basicPayments = action.payload;

                break;
            }
            case GetOverridesActionTypes.SUCCESS: {
                draft.overrides = action.payload;

                break;
            }
            case GetLongsActionTypes.SUCCESS: {
                draft.longs = action.payload;

                break;
            }
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            default:
                return state;
        }
    });
