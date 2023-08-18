import type { Action } from 'redux';
import type { UserHistory } from '@models/user-history';

export const USER_HISTORY_KEY = 'WR-USER-HISTORY';

export const UserHistoryActionTypes = {
    CREATE: `CREATE_${USER_HISTORY_KEY}`,
    // UPDATE: `UPDATE_${USER_HISTORY_KEY}`,
    // DELETE: `DELETE_${USER_HISTORY_KEY}`,
    INSERT: `INSERT_${USER_HISTORY_KEY}`,
} as const;

export interface CreateUserHistoryPayload extends UserHistory {}

export interface InsertUserHistoryPayload extends UserHistory {}

export interface CreateUserHistoryAction extends Action<string> {
    payload: CreateUserHistoryPayload;
}

export interface InsertUserHistoryAction extends Action<string> {
    payload: InsertUserHistoryPayload;
}

export function createUserHistory(
    payload: CreateUserHistoryPayload,
): CreateUserHistoryAction {
    return {
        type: UserHistoryActionTypes.CREATE,
        payload,
    };
}

export function insertUserHistory(
    payload: InsertUserHistoryPayload,
): InsertUserHistoryAction {
    return {
        type: UserHistoryActionTypes.INSERT,
        payload,
    };
}
