import type { Action } from 'redux';
// import type { Contact } from '@models/contact';
import type { Pay } from '@models/pay';
import type { CreateCarRequestPayload } from './create-car.action';

export const UPDATE_CAR_KEY = 'UPDATE_CAR';

export const UpdateCarActionTypes = {
    REQUEST: `${UPDATE_CAR_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_CAR_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_CAR_KEY}_FAILURE`,
} as const;

export interface UpdateCarRequestPayload
    extends Partial<CreateCarRequestPayload> {
    remove: {
        // p_persons?: Contact[];
        pays?: Pay[];
        // contacts?: Contact[];
    };
}

export interface UpdateCarRequestAction extends Action<string> {
    payload: UpdateCarRequestPayload;
}

export interface UpdateCarSuccessAction extends Action<string> {}

export function updateCarRequest(
    payload: UpdateCarRequestPayload,
): UpdateCarRequestAction {
    return {
        type: UpdateCarActionTypes.REQUEST,
        payload,
    };
}

export function updateCarSuccess(): UpdateCarSuccessAction {
    return {
        type: UpdateCarActionTypes.SUCCESS,
    };
}
