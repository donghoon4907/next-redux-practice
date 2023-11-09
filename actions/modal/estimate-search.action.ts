import type { Action } from 'redux';

export const ESTIMATE_SEARCH_MODAL_KEY = 'ESTIMATE_SEARCH_MODAL';

export const EstimateSearchModalActionTypes = {
    SHOW: `SHOW_${ESTIMATE_SEARCH_MODAL_KEY}`,
    HIDE: `HIDE_${ESTIMATE_SEARCH_MODAL_KEY}`,
} as const;

export interface EstimateSearchModalShowAction extends Action<string> {}

export interface EstimateSearchModalHideAction extends Action<string> {}

export function showEstimateSearchModal(): EstimateSearchModalShowAction {
    return {
        type: EstimateSearchModalActionTypes.SHOW,
    };
}

export function hideEstimateSearchModal(): EstimateSearchModalHideAction {
    return {
        type: EstimateSearchModalActionTypes.HIDE,
    };
}
