import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import produce from 'immer';
import { GetOrgasActionTypes } from '@actions/user/get-orgas';
import { DepartActionTypes } from '@actions/user/depart.action';

export interface UserState {
    orgas: CoreSelectOption[];
    selectedDepart: CoreSelectOption;
}

const initialState: UserState = {
    orgas: [],
    selectedDepart: {
        value: '',
        label: '',
    },
};

export const userReducer: Reducer<UserState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetOrgasActionTypes.SUCCESS: {
                draft.orgas = action.payload;
                break;
            }
            case DepartActionTypes.UPDATE: {
                draft.selectedDepart = action.payload;
                break;
            }
            default:
                return state;
        }
    });
