import type { Reducer } from 'redux';
import produce from 'immer';

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
