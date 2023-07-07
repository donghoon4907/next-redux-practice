import type { Reducer } from 'redux';
import type { CoreMenuOption } from '@interfaces/core';
import produce from 'immer';
import { GnbActionTypes } from '@actions/gnb/gnb.action';

export interface GnbState {
    activeGnb: CoreMenuOption[];
}

const initialState: GnbState = {
    activeGnb: [],
};

export const gnbReducer: Reducer<GnbState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GnbActionTypes.UPDATE: {
                draft.activeGnb = action.payload;
                break;
            }
            default:
                return state;
        }
    });
