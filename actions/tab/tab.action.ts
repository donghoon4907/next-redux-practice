import type { CoreLinkTabOption } from '@interfaces/core';
import { Action } from 'redux';

export const TAB_KEY = 'WR_TAB';

export const TabActionTypes = {
    INIT: `INIT_${TAB_KEY}`,
    ADD: `ADD_${TAB_KEY}`,
    REMOVE: `REMOVE_${TAB_KEY}`,
} as const;

export interface TabInitAction extends Action<string> {
    payload: CoreLinkTabOption[];
}

export interface TabAddAction extends Action<string> {
    payload: CoreLinkTabOption;
}

export interface TabRemoveAction extends Action<string> {
    payload: string;
}

export function initTab(payload: CoreLinkTabOption[]): TabInitAction {
    return {
        type: TabActionTypes.INIT,
        payload,
    };
}

export function addTab(payload: CoreLinkTabOption): TabAddAction {
    return {
        type: TabActionTypes.ADD,
        payload,
    };
}

export function removeTab(payload: string): TabRemoveAction {
    return {
        type: TabActionTypes.REMOVE,
        payload,
    };
}
