import type { Action } from 'redux';

export const CREATE_LONG_PAY_MODAL_KEY = 'CREATE-LONG-PAY-MODAL';

export const CREATE_GENERAL_PAY_MODAL_KEY = 'CREATE-GENERAL-PAY-MODAL';

export const CREATE_CAR_PAY_MODAL_KEY = 'CREATE-CAR-PAY-MODAL';

export const CreateLongPayModalActionTypes = {
    SHOW: `SHOW_${CREATE_LONG_PAY_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_LONG_PAY_MODAL_KEY}`,
} as const;

export const CreateGeneralPayModalActionTypes = {
    SHOW: `SHOW_${CREATE_GENERAL_PAY_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_GENERAL_PAY_MODAL_KEY}`,
} as const;

export const CreateCarPayModalActionTypes = {
    SHOW: `SHOW_${CREATE_CAR_PAY_MODAL_KEY}`,
    HIDE: `HIDE_${CREATE_CAR_PAY_MODAL_KEY}`,
} as const;

export interface CreateLongPayModalShowAction extends Action<string> {}

export interface CreateGeneralPayModalShowAction extends Action<string> {}

export interface CreateCarPayModalShowAction extends Action<string> {}

export interface CreateLongPayModalHideAction extends Action<string> {}

export interface CreateGeneralPayModalHideAction extends Action<string> {}

export interface CreateCarPayModalHideAction extends Action<string> {}

export function showCreateLongPayModal(): CreateGeneralPayModalShowAction {
    return {
        type: CreateLongPayModalActionTypes.SHOW,
    };
}

export function hideCreateLongPayModal(): CreateLongPayModalShowAction {
    return {
        type: CreateLongPayModalActionTypes.HIDE,
    };
}

export function showCreateGeneralPayModal(): CreateGeneralPayModalShowAction {
    return {
        type: CreateGeneralPayModalActionTypes.SHOW,
    };
}

export function hideCreateGeneralPayModal(): CreateGeneralPayModalHideAction {
    return {
        type: CreateGeneralPayModalActionTypes.HIDE,
    };
}

export function showCreateCarPayModal(): CreateCarPayModalShowAction {
    return {
        type: CreateCarPayModalActionTypes.SHOW,
    };
}

export function hideCreateCarPayModal(): CreateCarPayModalHideAction {
    return {
        type: CreateCarPayModalActionTypes.HIDE,
    };
}
