import type { Action } from 'redux';

export const CAR_SEARCH_MODAL_KEY = 'CAR-SEARCH-MODAL';

export const CarSearchModalActionTypes = {
    SHOW: `SHOW_${CAR_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${CAR_SEARCH_MODAL_KEY}`,
} as const;

export interface CarSearchModalShowAction extends Action<string> {}

export interface CarSearchModalHideAction extends Action<string> {}

export function showCarSearchModal(): CarSearchModalShowAction {
    return {
        type: CarSearchModalActionTypes.SHOW,
    };
}

export function hideCarSearchModal(): CarSearchModalHideAction {
    return {
        type: CarSearchModalActionTypes.HIDE,
    };
}
