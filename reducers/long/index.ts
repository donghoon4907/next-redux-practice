import type { Reducer } from 'redux';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
import { GetLongsActionTypes } from '@actions/long/get-longs.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';
import { UpdateEtcActionTypes } from '@actions/long/update-etc.action';

export interface LongState {
    longs: GetLongsSuccessPayload;
    long: any;
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
            case UpdateEtcActionTypes.UPDATE: {
                draft.long.etcs[action.payload.field] = action.payload.content;

                break;
            }
            default:
                return state;
        }
    });
