import type { Demo } from '@interfaces/demo';
import type { Reducer } from 'redux';
import produce from 'immer';
import { DemoActionTypes } from '@actions/demo/demo.action';

export interface DemoState {
    demos: Demo[];
}

const initialState: DemoState = {
    demos: [],
};

export const demoReducer: Reducer<DemoState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DemoActionTypes.SUCCESS: {
                draft.demos = action.payload;
                break;
            }
            default:
                return state;
        }
    });
