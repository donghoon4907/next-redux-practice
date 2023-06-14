import type { Reducer } from 'redux';
import type { CoreMenuOption } from '@interfaces/core';
import produce from 'immer';
import { TabActionTypes } from '@actions/tab/tab.action';

export interface TabState {
    tabs: CoreMenuOption[];
}

const initialState: TabState = {
    tabs: [],
};

export const tabReducer: Reducer<TabState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case TabActionTypes.INIT: {
                draft.tabs = action.payload;
                break;
            }
            case TabActionTypes.ADD: {
                draft.tabs = draft.tabs.concat(action.payload);
                break;
            }
            case TabActionTypes.REMOVE: {
                const tabId = action.payload;
                const tabIdx = draft.tabs.findIndex((tab) => tabId === tab.id);

                if (tabIdx !== -1) {
                    draft.tabs.splice(tabIdx, 1);
                }
                break;
            }
            default:
                return state;
        }
    });
