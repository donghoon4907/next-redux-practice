import type { Reducer } from 'redux';
import produce from 'immer';
import { GetBasicPaymentsActionTypes } from '@actions/long/get-basic-payments.action';
import { GetOverridesActionTypes } from '@actions/long/get-overrides.action';
import {
    GetLongActionTypes,
    GetLongRequestPayload,
} from '@actions/long/get-long.action';
import { Response } from '@models/response';

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
    long: Response & {
        lastPayload: GetLongRequestPayload | null;
    };
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
    long: {
        fields: [],
        rows: [],
        total: 0,
        lastPayload: null,
    },
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
            case GetLongActionTypes.SUCCESS: {
                draft.long = action.payload;

                break;
            }
            default:
                return state;
        }
    });
