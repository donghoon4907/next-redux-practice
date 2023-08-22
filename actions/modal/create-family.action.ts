import type { Action } from 'redux';

export const CREATE_FAMILY_MODAL_KEY = 'CREATE-FAMILY-MODAL';

export const CreateFamilyModalActionTypes = {
    SHOW: `SHOW_${CREATE_FAMILY_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_FAMILY_MODAL_KEY}`,
} as const;

export interface CreateFamilyModalShowAction extends Action<string> {}

export interface CreateFamilyModalHideAction extends Action<string> {}

export function showCreateFamilyModal(): CreateFamilyModalShowAction {
    return {
        type: CreateFamilyModalActionTypes.SHOW,
    };
}

export function hideCreateFamilyModal(): CreateFamilyModalHideAction {
    return {
        type: CreateFamilyModalActionTypes.HIDE,
    };
}
