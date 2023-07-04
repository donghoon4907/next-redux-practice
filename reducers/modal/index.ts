import type { Reducer } from 'redux';
import produce from 'immer';
import { DepartSearchModalActionTypes } from '@actions/modal/depart-search.action';

export interface ModalState {
    isShowdepartSearchModal: boolean;
}

const initialState: ModalState = {
    isShowdepartSearchModal: false,
};

export const modalReducer: Reducer<ModalState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DepartSearchModalActionTypes.SHOW: {
                draft.isShowdepartSearchModal = true;
                break;
            }
            case DepartSearchModalActionTypes.HIDE: {
                draft.isShowdepartSearchModal = false;
                break;
            }
            default:
                return state;
        }
    });
