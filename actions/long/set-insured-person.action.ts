import type { Action } from 'redux';
import type { InsuredPerson } from '@models/insured-person';

export const INSURED_PERSON_KEY = 'WR-INSURED-PERSON';

export const InsuredPersonActionTypes = {
    CREATE: `CREATE_${INSURED_PERSON_KEY}`,
    UPDATE: `UPDATE_${INSURED_PERSON_KEY}`,
    DELETE: `DELETE_${INSURED_PERSON_KEY}`,
} as const;

export interface CreateInsuredPersonPayload extends InsuredPerson {}

export interface UpdateInsuredPersonPayload
    extends Partial<CreateInsuredPersonPayload> {}

export interface DeleteInsuredPersonPayload {
    index: number;
}

export interface CreateInsuredPersonAction extends Action<string> {
    payload: CreateInsuredPersonPayload;
}

export interface UpdateInsuredPersonAction extends Action<string> {
    payload: UpdateInsuredPersonPayload;
}

export interface DeleteInsuredPersonAction extends Action<string> {
    payload: DeleteInsuredPersonPayload;
}

export function createInsuredPerson(
    payload: CreateInsuredPersonPayload,
): CreateInsuredPersonAction {
    return {
        type: InsuredPersonActionTypes.CREATE,
        payload,
    };
}

export function updateInsuredPerson(
    payload: UpdateInsuredPersonPayload,
): UpdateInsuredPersonAction {
    return {
        type: InsuredPersonActionTypes.UPDATE,
        payload,
    };
}

export function deleteInsuredPerson(
    payload: DeleteInsuredPersonPayload,
): DeleteInsuredPersonAction {
    return {
        type: InsuredPersonActionTypes.DELETE,
        payload,
    };
}
