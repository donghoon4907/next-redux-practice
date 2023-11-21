import type { Action } from 'redux';
import type { CreateUserRequestPayload } from './create-user.action';
import { Guarantee } from '@models/guarantee';
import { Code } from '@models/code';

export const UPDATE_USER_KEY = 'UPDATE_USER';

export const UpdateUserActionTypes = {
    REQUEST: `${UPDATE_USER_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_USER_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_USER_KEY}_FAILURE`,
} as const;

export interface UpdateUserRequestPayload
    extends Partial<CreateUserRequestPayload> {
    remove: {
        guarantee?: Guarantee[];
        fccode?: Code[];
    };
}

export interface UpdateUserRequestAction extends Action<string> {
    payload: UpdateUserRequestPayload;
}

export interface UpdateUserSuccessAction extends Action<string> {}

export function updateUserRequest(
    payload: UpdateUserRequestPayload,
): UpdateUserRequestAction {
    return {
        type: UpdateUserActionTypes.REQUEST,
        payload,
    };
}

export function updateUserSuccess(): UpdateUserSuccessAction {
    return {
        type: UpdateUserActionTypes.SUCCESS,
    };
}
