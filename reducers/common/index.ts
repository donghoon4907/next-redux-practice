import type { Reducer } from 'redux';
import type { Contact } from '@models/contact';
import type { UserHistory } from '@models/user-history';
import produce from 'immer';
import { ContactActionTypes } from '@actions/common/set-contact.action';
import { UserHistoryActionTypes } from '@actions/common/set-user-history.action';

export interface CommonState {
    /**
     * 접촉이력 목록
     */
    contacts: Contact[];
    /**
     * 삭제한 접촉이력 목록
     */
    removedContacts: Contact[];
    /**
     * 담당자변경이력 목록
     */
    userHistories: UserHistory[];
    /**
     * 새로운 담당자
     */
    newUserHistory: UserHistory | null;
}

const initialState: CommonState = {
    contacts: [],
    removedContacts: [],
    userHistories: [],
    newUserHistory: null,
};

export const commonReducer: Reducer<CommonState, any> = (
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
            case UserHistoryActionTypes.CREATE: {
                draft.userHistories = draft.userHistories.concat(
                    action.payload,
                );

                break;
            }
            case UserHistoryActionTypes.INSERT: {
                draft.newUserHistory = action.payload;

                break;
            }
            default:
                return state;
        }
    });
