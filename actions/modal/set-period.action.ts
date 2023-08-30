import type { Action } from 'redux';

export const SET_PERIOD_MODAL_KEY = 'SET_PERIOD_MODAL';

export const SetPeriodModalActionTypes = {
    SHOW: `SHOW_${SET_PERIOD_MODAL_KEY}`,
    HIDE: `HIDE_${SET_PERIOD_MODAL_KEY}`,
} as const;

export interface SetPeriodModalShowAction extends Action<string> {}

export interface SetPeriodModalHideAction extends Action<string> {}

export function showSetPeriodModal(): SetPeriodModalShowAction {
    return {
        type: SetPeriodModalActionTypes.SHOW,
    };
}

export function hideSetPeriodModal(): SetPeriodModalHideAction {
    return {
        type: SetPeriodModalActionTypes.HIDE,
    };
}
