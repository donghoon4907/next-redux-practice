import type { Action } from 'redux';
import type { CreateOrgaRequestPayload } from './create-orga.action';
import type { Code } from '@models/code';
import type { Associate } from '@models/associate';

export const UPDATE_ORGA_KEY = 'UPDATE_ORGA';

export const UpdateOrgaActionTypes = {
    REQUEST: `${UPDATE_ORGA_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_ORGA_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_ORGA_KEY}_FAILURE`,
} as const;

export interface UpdateOrgaRequestPayload
    extends Partial<Omit<CreateOrgaRequestPayload, 'associate' | 'insucode'>> {
    idx: number;
    associate: Associate[];
    insucode: Code[];
    remove: {
        insucode?: Code[];
    };
}

export interface UpdateOrgaRequestAction extends Action<string> {
    payload: UpdateOrgaRequestPayload;
}

export interface UpdateOrgaSuccessAction extends Action<string> {}

export function updateOrgaRequest(
    payload: UpdateOrgaRequestPayload,
): UpdateOrgaRequestAction {
    return {
        type: UpdateOrgaActionTypes.REQUEST,
        payload,
    };
}

export function updateOrgaSuccess(): UpdateOrgaSuccessAction {
    return {
        type: UpdateOrgaActionTypes.SUCCESS,
    };
}
