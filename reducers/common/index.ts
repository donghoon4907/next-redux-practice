import type { Reducer } from 'redux';
import type { Contact } from '@models/contact';
import type { UserHistory } from '@models/user-history';
import type { GetContactsSuccessPayload } from '@actions/common/get-contacts.action';
import produce from 'immer';
import { UserHistoryActionTypes } from '@actions/common/set-user-history.action';
import { GetContactsActionTypes } from '@actions/common/get-contacts.action';

export interface CommonState {
    /**
     * 접촉이력 목록(API 분리)
     */
    singleContacts: GetContactsSuccessPayload;
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
    singleContacts: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
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
            case GetContactsActionTypes.SUCCESS: {
                draft.singleContacts = action.payload;

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
