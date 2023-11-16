import type { Action } from 'redux';
import type { Contact } from '@models/contact';
import type { Pay } from '@models/pay';
import type { CreateLongRequestPayload } from './create.action';

export const UPDATE_LONG_KEY = 'UPDATE_LONG';

export const UpdateLongActionTypes = {
    REQUEST: `${UPDATE_LONG_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_LONG_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_LONG_KEY}_FAILURE`,
} as const;

export interface UpdateLongRequestPayload
    extends Partial<CreateLongRequestPayload> {
    remove: {
        // p_persons?: Contact[];
        pays?: Pay[];
        contacts?: Contact[];
    };
}

export interface UpdateLongRequestAction extends Action<string> {
    payload: UpdateLongRequestPayload;
}

export interface UpdateLongSuccessAction extends Action<string> {}

export function updateLongRequest(
    payload: UpdateLongRequestPayload,
): UpdateLongRequestAction {
    return {
        type: UpdateLongActionTypes.REQUEST,
        payload,
    };
}

export function updateLongSuccess(): UpdateLongSuccessAction {
    return {
        type: UpdateLongActionTypes.SUCCESS,
    };
}
