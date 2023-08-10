import type { Action } from 'redux';
import type { UserHistory } from '@models/user-history';

export const USERHISTORY_KEY = 'WR-USERHISTORY';

export const UserHistoryActionTypes = {
    CREATE: `CREATE_${USERHISTORY_KEY}`,
    UPDATE: `UPDATE_${USERHISTORY_KEY}`,
    DELETE: `DELETE_${USERHISTORY_KEY}`,
} as const;

export interface CreateUserHistoryPayload extends UserHistory {}

// export interface UpdateUserHistoryPayload
//     extends Partial<CreateUserHistoryPayload> {}

// export interface DeleteUserHistoryPayload {
//     index: number;
// }

export interface CreateUserHistoryAction extends Action<string> {
    payload: CreateUserHistoryPayload;
}

// export interface UpdateUserHistoryAction extends Action<string> {
//     payload: UpdateUserHistoryPayload;
// }

// export interface DeleteUserHistoryAction extends Action<string> {
//     payload: DeleteUserHistoryPayload;
// }

export function createUserHistory(
    payload: CreateUserHistoryPayload,
): CreateUserHistoryAction {
    return {
        type: UserHistoryActionTypes.CREATE,
        payload,
    };
}

// export function updateUserHistory(
//     payload: UpdateUserHistoryPayload,
// ): UpdateUserHistoryAction {
//     return {
//         type: UserHistoryActionTypes.UPDATE,
//         payload,
//     };
// }

// export function deleteUserHistory(
//     payload: DeleteUserHistoryPayload,
// ): DeleteUserHistoryAction {
//     return {
//         type: UserHistoryActionTypes.DELETE,
//         payload,
//     };
// }
