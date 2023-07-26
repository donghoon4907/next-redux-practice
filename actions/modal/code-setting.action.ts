import type { Action } from 'redux';

export const CODE_SETTING_MODAL_KEY = 'CODE_SETTING_MODAL_KEY';

export const CodeSettingModalActionTypes = {
    SHOW: `SHOW_${CODE_SETTING_MODAL_KEY}`,
    HIDE: `HIDE_${CODE_SETTING_MODAL_KEY}`,
} as const;

export interface CodeSettingModalShowAction extends Action<string> {}

export interface CodeSettingModalHideAction extends Action<string> {}

export function showCodeSettingModal(): CodeSettingModalShowAction {
    return {
        type: CodeSettingModalActionTypes.SHOW,
    };
}

export function hideCodeSettingModal(): CodeSettingModalHideAction {
    return {
        type: CodeSettingModalActionTypes.HIDE,
    };
}
