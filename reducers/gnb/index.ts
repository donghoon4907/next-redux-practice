import type { Reducer } from 'redux';
import type { CoreMenuOption } from '@interfaces/core';
import produce from 'immer';
import { GnbActionTypes } from '@actions/gnb/gnb.action';

export interface GnbState {
    /** 선택된 GNB ID */
    activeId: string;
    /** 선택된 GNB의 하위 메뉴 */
    activeMenu: CoreMenuOption[];
}

const initialState: GnbState = {
    activeId: '',
    activeMenu: [],
};

export const gnbReducer: Reducer<GnbState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GnbActionTypes.UPDATE: {
                draft.activeId = action.payload.id;
                draft.activeMenu = action.payload.menu;
                break;
            }
            default:
                return state;
        }
    });
