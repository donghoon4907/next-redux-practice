import type { Action } from 'redux';

export const GUARANTEE_SETTING_MODAL_KEY = 'GUARANTEE_SETTING_MODAL';

export const GuaranteeSettingModalActionTypes = {
    SHOW: `SHOW_${GUARANTEE_SETTING_MODAL_KEY}`,
    HIDE: `HIDE_${GUARANTEE_SETTING_MODAL_KEY}`,
} as const;

export interface GuaranteeSettingModalShowAction extends Action<string> {}

export interface GuaranteeSettingModalHideAction extends Action<string> {}

export function showGuaranteeSettingModal(): GuaranteeSettingModalShowAction {
    return {
        type: GuaranteeSettingModalActionTypes.SHOW,
    };
}

export function hideGuaranteeSettingModal(): GuaranteeSettingModalHideAction {
    return {
        type: GuaranteeSettingModalActionTypes.HIDE,
    };
}
