import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Contact } from '@models/contact';

export const CONTACT_KEY = 'WR-CONTACT';

export const ContactActionTypes = {
    CREATE: `CREATE_${CONTACT_KEY}`,
    UPDATE: `UPDATE_${CONTACT_KEY}`,
    DELETE: `DELETE_${CONTACT_KEY}`,
} as const;

export interface CreateContactPayload extends CorePayload, Contact {}

export interface UpdateContactPayload extends Partial<CreateContactPayload> {}

export interface DeleteContactPayload extends CorePayload {
    index: number;
}

export interface CreateContactAction extends Action<string> {
    payload: CreateContactPayload;
}

export interface UpdateContactAction extends Action<string> {
    payload: UpdateContactPayload;
}

export interface DeleteContactAction extends Action<string> {
    payload: DeleteContactPayload;
}

export function createContact(
    payload: CreateContactPayload,
): CreateContactAction {
    return {
        type: ContactActionTypes.CREATE,
        payload,
    };
}

export function updateContact(
    payload: UpdateContactPayload,
): UpdateContactAction {
    return {
        type: ContactActionTypes.UPDATE,
        payload,
    };
}

export function deleteContact(
    payload: DeleteContactPayload,
): DeleteContactAction {
    return {
        type: ContactActionTypes.DELETE,
        payload,
    };
}
