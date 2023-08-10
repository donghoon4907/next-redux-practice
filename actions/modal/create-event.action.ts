import type { Action } from 'redux';

export const CREATE_EVENT_MODAL_KEY = 'CREATE_EVENT_MODAL_KEY';

export const CreateEventModalActionTypes = {
    SHOW: `SHOW_${CREATE_EVENT_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_EVENT_MODAL_KEY}`,
} as const;

export interface CreateEventModalShowAction extends Action<string> {}

export interface CreateEventModalHideAction extends Action<string> {}

export function showCreateEventModal(): CreateEventModalShowAction {
    return {
        type: CreateEventModalActionTypes.SHOW,
    };
}

export function hideCreateEventModal(): CreateEventModalHideAction {
    return {
        type: CreateEventModalActionTypes.HIDE,
    };
}
