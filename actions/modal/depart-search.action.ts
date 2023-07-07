import type { Action } from 'redux';

export const DEPART_SEARCH_MODAL_KEY = 'DEPART_SEARCH_MODAL_KEY';

export const DepartSearchModalActionTypes = {
    SHOW: `SHOW_${DEPART_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${DEPART_SEARCH_MODAL_KEY}`,
} as const;

export interface DepartSearchModalShowAction extends Action<string> {}

export interface DepartSearchModalHideAction extends Action<string> {}

export function showDepartSearchModal(): DepartSearchModalShowAction {
    return {
        type: DepartSearchModalActionTypes.SHOW,
    };
}

export function hideDepartSearchModal(): DepartSearchModalHideAction {
    return {
        type: DepartSearchModalActionTypes.HIDE,
    };
}
