import type { Action } from 'redux';

export const SET_VIEWER_MODAL_KEY = 'SET_VIEWER_MODAL';

export const SetViewerModalActionTypes = {
    SHOW: `SHOW_${SET_VIEWER_MODAL_KEY}`,
    HIDE: `HIDE_${SET_VIEWER_MODAL_KEY}`,
} as const;

export interface SetViewerModalShowAction extends Action<string> {}

export interface SetViewerModalHideAction extends Action<string> {}

export function showSetViewerModal(): SetViewerModalShowAction {
    return {
        type: SetViewerModalActionTypes.SHOW,
    };
}

export function hideSetViewerModal(): SetViewerModalHideAction {
    return {
        type: SetViewerModalActionTypes.HIDE,
    };
}
