import type { Reducer } from 'redux';
import produce from 'immer';
import { GetBasicPaymentsActionTypes } from '@actions/long/get-basic-payments.action';
import { GetOverridesActionTypes } from '@actions/long/get-overrides.action';
import { GetLongActionTypes } from '@actions/long/get-long.action';

export interface LoginState {
    id: string | null;
}

const initialState: LoginState = {
    id: null,
};

export const loginReducer: Reducer<LoginState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            default:
                return state;
        }
    });
