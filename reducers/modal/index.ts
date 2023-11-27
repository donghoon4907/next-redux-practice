import type { Reducer } from 'redux';
import produce from 'immer';
import { DepartSearchModalActionTypes } from '@actions/modal/depart-search.action';
import { UserHistoryModalActionTypes } from '@actions/modal/user-history.action';
import { ImageUploadModalActionTypes } from '@actions/modal/image-upload.action';
import { GuaranteeSettingModalActionTypes } from '@actions/modal/guarantee-setting.action';
import { CreateExcontractModalActionTypes } from '@actions/modal/create-excontract.action';
import { CreateCustcarModalActionTypes } from '@actions/modal/create-custcar.action';
import { CreateFamilyModalActionTypes } from '@actions/modal/create-family.action';
import { CreateEventModalActionTypes } from '@actions/modal/create-event.action';
import { ProductSearchModalActionTypes } from '@actions/modal/product-search.action';
import { ContractorSearchModalActionTypes } from '@actions/modal/customer-search.action';
import { CreateBupumModalActionTypes } from '@actions/modal/create-bupum.action';
import { GetCarcodeModalActionTypes } from '@actions/modal/get-carcode.action';
import { SetCaraccModalActionTypes } from '@actions/modal/set-caracc.action';
import { SetInfoCustModalActionTypes } from '@actions/modal/set-info-cust.action';
import { SetInfoProductModalActionTypes } from '@actions/modal/set-info-product.action';
import { EstimateSearchModalActionTypes } from '@actions/modal/estimate-search.action';

export interface ModalState {
    isShowdepartSearchModal: boolean;
    isShowUserHistoryModal: boolean;
    isShowImageUploadModal: boolean;
    isShowGuaranteeSettingModal: boolean;
    isShowCreateExcontractLongModal: boolean;
    isShowCreateExcontractCarModal: boolean;
    isShowCreateExcontractGenModal: boolean;
    isShowCreateCustcarCarModal: boolean;
    isShowCreateCustcarCustModal: boolean;
    isShowCreateFamilyModal: boolean;
    isShowCreateEventModal: boolean;
    isShowProductSearchModal: boolean;
    isShowContractorSearchModal: boolean;
    isShowCreateBupumModal: boolean;
    isShowCarSearchModal: boolean;
    isShowSetCaraccModal: boolean;
    isShowSetInfoCustModal: boolean;
    isShowSetInfoProductModal: boolean;
    isShowEstimateSearchModal: boolean;
}

const initialState: ModalState = {
    isShowdepartSearchModal: false,
    isShowUserHistoryModal: false,
    isShowImageUploadModal: false,
    isShowGuaranteeSettingModal: false,
    isShowCreateExcontractLongModal: false,
    isShowCreateExcontractCarModal: false,
    isShowCreateExcontractGenModal: false,
    isShowCreateCustcarCarModal: false,
    isShowCreateCustcarCustModal: false,
    isShowCreateFamilyModal: false,
    isShowCreateEventModal: false,
    isShowProductSearchModal: false,
    isShowContractorSearchModal: false,
    isShowCreateBupumModal: false,
    isShowCarSearchModal: false,
    isShowSetCaraccModal: false,
    isShowSetInfoCustModal: false,
    isShowSetInfoProductModal: false,
    isShowEstimateSearchModal: false,
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
            case CreateEventModalActionTypes.SHOW: {
                draft.isShowCreateEventModal = true;
                break;
            }
            case CreateEventModalActionTypes.HIDE: {
                draft.isShowCreateEventModal = false;
                break;
            }
            case ProductSearchModalActionTypes.SHOW: {
                draft.isShowProductSearchModal = true;
                break;
            }
            case ProductSearchModalActionTypes.HIDE: {
                draft.isShowProductSearchModal = false;
                break;
            }
            case ContractorSearchModalActionTypes.SHOW: {
                draft.isShowContractorSearchModal = true;
                break;
            }
            case ContractorSearchModalActionTypes.HIDE: {
                draft.isShowContractorSearchModal = false;
                break;
            }
            case CreateBupumModalActionTypes.SHOW: {
                draft.isShowCreateBupumModal = true;
                break;
            }
            case CreateBupumModalActionTypes.HIDE: {
                draft.isShowCreateBupumModal = false;
                break;
            }
            case GetCarcodeModalActionTypes.SHOW: {
                draft.isShowCarSearchModal = true;
                break;
            }
            case GetCarcodeModalActionTypes.HIDE: {
                draft.isShowCarSearchModal = false;
                break;
            }
            case SetCaraccModalActionTypes.SHOW: {
                draft.isShowSetCaraccModal = true;
                break;
            }
            case SetCaraccModalActionTypes.HIDE: {
                draft.isShowSetCaraccModal = false;
                break;
            }
            case SetInfoCustModalActionTypes.SHOW: {
                draft.isShowSetInfoCustModal = true;
                break;
            }
            case SetInfoCustModalActionTypes.HIDE: {
                draft.isShowSetInfoCustModal = false;
                break;
            }
            case SetInfoProductModalActionTypes.SHOW: {
                draft.isShowSetInfoProductModal = true;
                break;
            }
            case SetInfoProductModalActionTypes.HIDE: {
                draft.isShowSetInfoProductModal = false;
                break;
            }
            case EstimateSearchModalActionTypes.SHOW: {
                draft.isShowEstimateSearchModal = true;
                break;
            }
            case EstimateSearchModalActionTypes.HIDE: {
                draft.isShowEstimateSearchModal = false;
                break;
            }
            default:
                return state;
        }
    });
