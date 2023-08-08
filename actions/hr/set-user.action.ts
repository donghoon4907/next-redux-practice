import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const USER_KEY = 'WR-USER';

export const UserActionTypes = {
    UPDATE: `UPDATE_${USER_KEY}`,
} as const;

export interface UserUpdatePayload extends CorePayload {
    userid: string;
    department: string;
    name: string;
    remark: string;
}

export interface UserUpdateAction extends Action<string> {
    payload: UserUpdatePayload;
}

export function updateUser(payload: UserUpdatePayload): UserUpdateAction {
    return {
        type: UserActionTypes.UPDATE,
        payload,
    };
}
