import type { Reducer } from 'redux';
import type { Contact } from '@models/contact';
import produce from 'immer';
import { ContactActionTypes } from '@actions/customer/set-contact.action';

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
            default:
                return state;
        }
    });
