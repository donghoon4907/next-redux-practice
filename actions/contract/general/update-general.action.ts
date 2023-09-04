import type { Action } from 'redux';
import type { Contact } from '@models/contact';
import type { Pay } from '@models/pay';
import type { CreateGeneralRequestPayload } from './create-general.action';

export const UPDATE_GENERAL_KEY = 'UPDATE_GENERAL';

export const UpdateGeneralActionTypes = {
    REQUEST: `${UPDATE_GENERAL_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_GENERAL_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_GENERAL_KEY}_FAILURE`,
} as const;

export interface UpdateGeneralRequestPayload
    extends Partial<CreateGeneralRequestPayload> {
    remove: {
        // p_persons?: Contact[];
        pays?: Pay[];
        contacts?: Contact[];
    };
}

export interface UpdateGeneralRequestAction extends Action<string> {
    payload: UpdateGeneralRequestPayload;
}

export interface UpdateGeneralSuccessAction extends Action<string> {}

export function updateGeneralRequest(
    payload: UpdateGeneralRequestPayload,
): UpdateGeneralRequestAction {
    return {
        type: UpdateGeneralActionTypes.REQUEST,
        payload,
    };
}

export function updateGeneralSuccess(): UpdateGeneralSuccessAction {
    return {
        type: UpdateGeneralActionTypes.SUCCESS,
    };
}
