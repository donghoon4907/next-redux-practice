import type { Action } from 'redux';
import type { UserHistory } from '@models/user-history';

export const USER_KEY = 'WR-USER';

export const UserActionTypes = {
    UPDATE: `UPDATE_${USER_KEY}`,
} as const;

export interface UserUpdatePayload extends UserHistory {}

export interface UserUpdateAction extends Action<string> {
    payload: UserUpdatePayload;
}

export function updateUser(payload: UserUpdatePayload): UserUpdateAction {
    return {
        type: UserActionTypes.UPDATE,
        payload,
    };
}
