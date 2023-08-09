import type { Reducer } from 'redux';
import type { Contact } from '@models/contact';
import type { Excontract } from '@models/excontract';
import type { Custcar } from '@models/custcar';
import produce from 'immer';
import { ContactActionTypes } from '@actions/customer/set-contact.action';
import { ExcontractActionTypes } from '@actions/customer/set-excontract.action';
import { CustcarActionTypes } from '@actions/customer/set-custcar.action';

export interface CustomerState {
    /**
     * 고객 검색 목록
     */
    customers: any;
    /**
     * 고객 상세 정보
     */
    customer: any;
    /**
     * 접촉이력 목록
     */
    contacts: Contact[];
    /**
     * 삭제한 접촉이력 목록
     */
    removedContacts: Contact[];
    /**
     * 타사 보험 목록
     */
    excontracts: Excontract[];
    /**
     * 삭제한 타사 보험 목록
     */
    removedExcontracts: Excontract[];
    /**
     * 피담보물/차량 목록
     */
    custcars: Custcar[];
    /**
     * 삭제한 피담보물/차량 목록
     */
    removedCustcars: Custcar[];
}

const initialState: CustomerState = {
    customers: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    customer: null,
    contacts: [],
    removedContacts: [],
    excontracts: [],
    removedExcontracts: [],
    custcars: [],
    removedCustcars: [],
};

export const customerReducer: Reducer<CustomerState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case ContactActionTypes.CREATE: {
                draft.contacts = draft.contacts.concat(action.payload);
                break;
            }
            case ContactActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.contacts.length; i++) {
                    if (draft.contacts[i].index === index) {
                        draft.contacts[i] = {
                            ...draft.contacts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case ContactActionTypes.DELETE: {
                const findIndex = draft.contacts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.contacts.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedContacts =
                            draft.removedContacts.concat(deleted);
                    }
                }

                break;
            }
            case ExcontractActionTypes.CREATE: {
                draft.excontracts = draft.excontracts.concat(action.payload);
                break;
            }
            case ExcontractActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.excontracts.length; i++) {
                    if (draft.excontracts[i].index === index) {
                        draft.excontracts[i] = {
                            ...draft.excontracts[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case ExcontractActionTypes.DELETE: {
                const findIndex = draft.excontracts.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.excontracts.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedExcontracts =
                            draft.removedExcontracts.concat(deleted);
                    }
                }

                break;
            }
            case CustcarActionTypes.CREATE: {
                draft.custcars = draft.custcars.concat(action.payload);
                break;
            }
            case CustcarActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.custcars.length; i++) {
                    if (draft.custcars[i].index === index) {
                        draft.custcars[i] = {
                            ...draft.custcars[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case CustcarActionTypes.DELETE: {
                const findIndex = draft.custcars.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.custcars.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedCustcars =
                            draft.removedCustcars.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
