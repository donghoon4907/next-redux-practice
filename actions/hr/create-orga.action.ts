import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Code } from '@models/code';
import type { Associate } from '@models/associate';

export const CREATE_ORGA_KEY = 'CREATE_ORGA';

export const CreateOrgaActionTypes = {
    REQUEST: `${CREATE_ORGA_KEY}_REQUEST`,
    SUCCESS: `${CREATE_ORGA_KEY}_SUCCESS`,
    FAILURE: `${CREATE_ORGA_KEY}_FAILURE`,
} as const;

export interface CreateOrgaRequestPayload extends CorePayload {
    orga_rank?: string;
    orga_name?: string;
    manager_id?: string;
    status?: string;
    indate?: string;
    outdate?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    income_bank?: string;
    income_name?: string;
    income_tax?: boolean;
    tel?: string;
    fax?: string;
    associate: Associate[];
    fccode: Code[];
}

export interface CreateOrgaRequestAction extends Action<string> {
    payload: CreateOrgaRequestPayload;
}

export interface CreateOrgaSuccessAction extends Action<string> {}

export function createOrgaRequest(
    payload: CreateOrgaRequestPayload,
): CreateOrgaRequestAction {
    return {
        type: CreateOrgaActionTypes.REQUEST,
        payload,
    };
}

export function createOrgaSuccess(): CreateOrgaSuccessAction {
    return {
        type: CreateOrgaActionTypes.SUCCESS,
    };
}
