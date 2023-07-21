import type { Reducer } from 'redux';
import produce from 'immer';
import { DepartSearchModalActionTypes } from '@actions/modal/depart-search.action';
import { UserHistoryModalActionTypes } from '@actions/modal/user-history.action';
import { CreateEtcModalActionTypes } from '@actions/modal/create-etc.action';
import { SetViewerModalActionTypes } from '@actions/modal/set-viewer.action';
import { ImageUploadModalActionTypes } from '@actions/modal/image-upload.action';
import { GuaranteeSettingModalActionTypes } from '@actions/modal/guarantee-setting.action';

export interface ModalState {
    isShowdepartSearchModal: boolean;
    isShowUserHistoryModal: boolean;
    isShowCreateEtcModal: boolean;
    isShowSetViewerModal: boolean;
    isShowImageUploadModal: boolean;
    isShowGuaranteeSettingModal: boolean;
}

const initialState: ModalState = {
    isShowdepartSearchModal: false,
    isShowUserHistoryModal: false,
    isShowCreateEtcModal: false,
    isShowSetViewerModal: false,
    isShowImageUploadModal: false,
    isShowGuaranteeSettingModal: false,
};

export const modalReducer: Reducer<ModalState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case DepartSearchModalActionTypes.SHOW: {
                draft.isShowdepartSearchModal = true;
                break;
            }
            case DepartSearchModalActionTypes.HIDE: {
                draft.isShowdepartSearchModal = false;
                break;
            }
            case UserHistoryModalActionTypes.SHOW: {
                draft.isShowUserHistoryModal = true;
                break;
            }
            case UserHistoryModalActionTypes.HIDE: {
                draft.isShowUserHistoryModal = false;
                break;
            }
            case CreateEtcModalActionTypes.SHOW: {
                draft.isShowCreateEtcModal = true;
                break;
            }
            case CreateEtcModalActionTypes.HIDE: {
                draft.isShowCreateEtcModal = false;
                break;
            }
            case SetViewerModalActionTypes.SHOW: {
                draft.isShowSetViewerModal = true;
                break;
            }
            case SetViewerModalActionTypes.HIDE: {
                draft.isShowSetViewerModal = false;
                break;
            }
            case ImageUploadModalActionTypes.SHOW: {
                draft.isShowImageUploadModal = true;
                break;
            }
            case ImageUploadModalActionTypes.HIDE: {
                draft.isShowImageUploadModal = false;
                break;
            }
            case GuaranteeSettingModalActionTypes.SHOW: {
                draft.isShowGuaranteeSettingModal = true;
                break;
            }
            case GuaranteeSettingModalActionTypes.HIDE: {
                draft.isShowGuaranteeSettingModal = false;
                break;
            }
            default:
                return state;
        }
    });
