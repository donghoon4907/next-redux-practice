import type { Action } from 'redux';

export const LIFE_LONG_MODAL_KEY = 'LIFE_LONG_MODAL_KEY';

export const LifeLongModalActionTypes = {
    SHOW: `SHOW_${LIFE_LONG_MODAL_KEY}`,
    HIDE: `HIDE_${LIFE_LONG_MODAL_KEY}`,
} as const;

export interface LifeLongModalShowAction extends Action<string> {}

export interface LifeLongModalHideAction extends Action<string> {}

export function showLifeLongModal(): LifeLongModalShowAction {
    return {
        type: LifeLongModalActionTypes.SHOW,
    };
}

export function hideLifeLongModal(): LifeLongModalHideAction {
    return {
        type: LifeLongModalActionTypes.HIDE,
    };
}
