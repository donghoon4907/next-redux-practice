import type { Reducer } from 'redux';
import produce from 'immer';

export interface CustomerState {
    customers: any;
    customer: any;
}

const initialState: CustomerState = {
    customers: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    customer: null,
};

export const customerReducer: Reducer<CustomerState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            default:
                return state;
        }
    });
