import { type CoreMenuOption } from '@interfaces/core';
import { Action } from 'redux';

export const TAB_KEY = 'TAB';

export enum TabActionTypes {
    INIT = `INIT_${TAB_KEY}`,
    ADD = `ADD_${TAB_KEY}`,
    REMOVE = `REMOVE_${TAB_KEY}`,
}

export interface TabInitAction extends Action<TabActionTypes.INIT> {
    payload: CoreMenuOption[];
}

export interface TabAddAction extends Action<TabActionTypes.ADD> {
    payload: CoreMenuOption;
}

export interface TabRemoveAction extends Action<TabActionTypes.REMOVE> {
    payload: string;
}

export function initTab(payload: CoreMenuOption[]): TabInitAction {
    return {
        type: TabActionTypes.INIT,
        payload,
    };
}

export function addTab(payload: CoreMenuOption): TabAddAction {
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
