import { Action } from 'redux';

export const DEPART_SEARCH_MODAL_KEY = 'DEPART_SEARCH_MODAL_KEY';

export const DepartSearchModalActionTypes = {
    SHOW: `INIT_${DEPART_SEARCH_MODAL_KEY}`,
    HIDE: `ADD_${DEPART_SEARCH_MODAL_KEY}`,
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
