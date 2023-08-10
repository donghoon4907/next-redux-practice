import type { Reducer } from 'redux';
import produce from 'immer';
import { DepartSearchModalActionTypes } from '@actions/modal/depart-search.action';
import { UserHistoryModalActionTypes } from '@actions/modal/user-history.action';
import { CreateEtcModalActionTypes } from '@actions/modal/create-etc.action';
import { SetViewerModalActionTypes } from '@actions/modal/set-viewer.action';
import { ImageUploadModalActionTypes } from '@actions/modal/image-upload.action';
import { GuaranteeSettingModalActionTypes } from '@actions/modal/guarantee-setting.action';
import { CodeSettingModalActionTypes } from '@actions/modal/code-setting.action';
import { LifeLongModalActionTypes } from '@actions/modal/life-long.action';
import { CreateExcontractModalActionTypes } from '@actions/modal/create-excontract.action';
import { CreateCustcarModalActionTypes } from '@actions/modal/create-custcar.action';
import { CreateFamilyModalActionTypes } from '@actions/modal/create-family.action';

export interface ModalState {
    isShowdepartSearchModal: boolean;
    isShowUserHistoryModal: boolean;
    isShowCreateEtcModal: boolean;
    isShowSetViewerModal: boolean;
    isShowImageUploadModal: boolean;
    isShowGuaranteeSettingModal: boolean;
    isShowCodeSettingModal: boolean;
    isShowLifeLongModal: boolean;
    isShowCreateExcontractLongModal: boolean;
    isShowCreateExcontractCarModal: boolean;
    isShowCreateExcontractGenModal: boolean;
    isShowCreateCustcarCarModal: boolean;
    isShowCreateCustcarCustModal: boolean;
    isShowCreateFamilyModal: boolean;
}

const initialState: ModalState = {
    isShowdepartSearchModal: false,
    isShowUserHistoryModal: false,
    isShowCreateEtcModal: false,
    isShowSetViewerModal: false,
    isShowImageUploadModal: false,
    isShowGuaranteeSettingModal: false,
    isShowCodeSettingModal: false,
    isShowLifeLongModal: false,
    isShowCreateExcontractLongModal: false,
    isShowCreateExcontractCarModal: false,
    isShowCreateExcontractGenModal: false,
    isShowCreateCustcarCarModal: false,
    isShowCreateCustcarCustModal: false,
    isShowCreateFamilyModal: false,
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
            case CodeSettingModalActionTypes.SHOW: {
                draft.isShowCodeSettingModal = true;
                break;
            }
            case CodeSettingModalActionTypes.HIDE: {
                draft.isShowCodeSettingModal = false;
                break;
            }
            case LifeLongModalActionTypes.SHOW: {
                draft.isShowLifeLongModal = true;
                break;
            }
            case LifeLongModalActionTypes.HIDE: {
                draft.isShowLifeLongModal = false;
                break;
            }
            case CreateExcontractModalActionTypes.SHOW: {
                if (action.payload === 'long') {
                    draft.isShowCreateExcontractLongModal = true;
                } else if (action.payload === 'car') {
                    draft.isShowCreateExcontractCarModal = true;
                } else if (action.payload === 'gen') {
                    draft.isShowCreateExcontractGenModal = true;
                }
                break;
            }
            case CreateExcontractModalActionTypes.HIDE: {
                if (action.payload === 'long') {
                    draft.isShowCreateExcontractLongModal = false;
                } else if (action.payload === 'car') {
                    draft.isShowCreateExcontractCarModal = false;
                } else if (action.payload === 'gen') {
                    draft.isShowCreateExcontractGenModal = false;
                }
                break;
            }
            case CreateCustcarModalActionTypes.SHOW: {
                if (action.payload === 'car') {
                    draft.isShowCreateCustcarCarModal = true;
                } else if (action.payload === 'cust') {
                    draft.isShowCreateCustcarCustModal = true;
                }
                break;
            }
            case CreateCustcarModalActionTypes.HIDE: {
                if (action.payload === 'car') {
                    draft.isShowCreateCustcarCarModal = false;
                } else if (action.payload === 'cust') {
                    draft.isShowCreateCustcarCustModal = false;
                }
                break;
            }
            case CreateFamilyModalActionTypes.SHOW: {
                draft.isShowCreateFamilyModal = true;
                break;
            }
            case CreateFamilyModalActionTypes.HIDE: {
                draft.isShowCreateFamilyModal = false;
                break;
            }
            default:
                return state;
        }
    });
