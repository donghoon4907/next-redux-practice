import type { Action } from 'redux';
import type { Contact } from '@models/contact';
import type { Excontract } from '@models/excontract';
import type { Custcar } from '@models/custcar';
import type { Family } from '@models/family';
import type { Event } from '@models/event';
import { CreateCustomerRequestPayload } from './create-customer.action';

export const UPDATE_CUSTOMER_KEY = 'UPDATE_CUSTOMER';

export const UpdateCustomerActionTypes = {
    REQUEST: `${UPDATE_CUSTOMER_KEY}_REQUEST`,
    SUCCESS: `${UPDATE_CUSTOMER_KEY}_SUCCESS`,
    FAILURE: `${UPDATE_CUSTOMER_KEY}_FAILURE`,
} as const;

export interface UpdateCustomerRequestPayload
    extends Partial<CreateCustomerRequestPayload> {
    remove: {
        contacts?: Contact[];
        excontract?: Excontract[];
        custcar?: Custcar[];
        family?: Family[];
        event?: Event[];
    };
}

export interface UpdateCustomerRequestAction extends Action<string> {
    payload: UpdateCustomerRequestPayload;
}

export interface UpdateCustomerSuccessAction extends Action<string> {}

export function updateCustomerRequest(
    payload: UpdateCustomerRequestPayload,
): UpdateCustomerRequestAction {
    return {
        type: UpdateCustomerActionTypes.REQUEST,
        payload,
    };
}

export function updateCustomerSuccess(): UpdateCustomerSuccessAction {
    return {
        type: UpdateCustomerActionTypes.SUCCESS,
    };
}
