import type { Action } from 'redux';
import type { Endorsement } from '@models/endorsement';

export const ENDORSEMENT_KEY = 'WR-ENDORSEMENT';

export const EndorsementActionTypes = {
    CREATE: `CREATE_${ENDORSEMENT_KEY}`,
    UPDATE: `UPDATE_${ENDORSEMENT_KEY}`,
    DELETE: `DELETE_${ENDORSEMENT_KEY}`,
} as const;

export interface CreateEndorsementPayload extends Endorsement {}

export interface UpdateEndorsementPayload
    extends Partial<CreateEndorsementPayload> {}

export interface DeleteEndorsementPayload {
    index: number;
}

export interface CreateEndorsementAction extends Action<string> {
    payload: CreateEndorsementPayload;
}

export interface UpdateEndorsementAction extends Action<string> {
    payload: UpdateEndorsementPayload;
}

export interface DeleteEndorsementAction extends Action<string> {
    payload: DeleteEndorsementPayload;
}

export function createEndorsement(
    payload: CreateEndorsementPayload,
): CreateEndorsementAction {
    return {
        type: EndorsementActionTypes.CREATE,
        payload,
    };
}

export function updateEndorsement(
    payload: UpdateEndorsementPayload,
): UpdateEndorsementAction {
    return {
        type: EndorsementActionTypes.UPDATE,
        payload,
    };
}

export function deleteEndorsement(
    payload: DeleteEndorsementPayload,
): DeleteEndorsementAction {
    return {
        type: EndorsementActionTypes.DELETE,
        payload,
    };
}
