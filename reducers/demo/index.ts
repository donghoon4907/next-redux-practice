import type { Demo } from '@interfaces/demo';
import type { Reducer } from 'redux';
import produce from 'immer';
import { DemoActionTypes } from '@actions/demo/demo.action';

export interface DemoState {
    fields: any[];
    data: any[];
    total: any;
}

const initialState: DemoState = {
    fields: [],
    data: [],
    total: 0,
};

export const demoReducer: Reducer<DemoState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DemoActionTypes.SUCCESS: {
                draft.fields = action.payload.fields;

                draft.data = action.payload.data;

                draft.total = action.payload.total;
                break;
            }
            default:
                return state;
        }
    });
