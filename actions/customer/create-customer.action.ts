import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Contact } from '@models/contact';
import type { Excontract } from '@models/excontract';
import type { Custcar } from '@models/custcar';
import type { Family } from '@models/family';
import type { Event } from '@models/event';
import { UserHistory } from '@models/user-history';

export const CREATE_CUSTOMER_KEY = 'CREATE_CUSTOMER';

export const CreateCustomerActionTypes = {
    REQUEST: `${CREATE_CUSTOMER_KEY}_REQUEST`,
    SUCCESS: `${CREATE_CUSTOMER_KEY}_SUCCESS`,
    FAILURE: `${CREATE_CUSTOMER_KEY}_FAILURE`,
} as const;

export interface CreateCustomerRequestPayload extends CorePayload {
    name: string;
    custtype: number;
    idnum?: string;
    // 담당자
    userid: string;
    birthday?: string;
    b_type?: boolean;
    mobile?: string;
    mobile_com?: string;
    emailhome?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    sourceroot?: string;
    customer_rate?: string;
    privacyinfo?: {
        type: string;
        insert_datetime?: string;
    };
    job?: string;
    userid_his?: UserHistory[];
    office?: {
        comname?: string;
        title?: string;
        tel?: string;
        fax?: string;
        postcode?: string;
        address1?: string;
        address2?: string;
        address3?: string;
    };
    manager?: {
        name?: string;
        orgatitle?: string;
        tel?: string;
        email?: string;
    };
    contacts?: Contact[];
    excontracts?: Excontract[];
    custcars?: Custcar[];
    family?: Family[];
    events?: Event[];
}

export interface CreateCustomerRequestAction extends Action<string> {
    payload: CreateCustomerRequestPayload;
}

export interface CreateCustomerSuccessAction extends Action<string> {}

export function createCustomerRequest(
    payload: CreateCustomerRequestPayload,
): CreateCustomerRequestAction {
    return {
        type: CreateCustomerActionTypes.REQUEST,
        payload,
    };
}

export function createCustomerSuccess(): CreateCustomerSuccessAction {
    return {
        type: CreateCustomerActionTypes.SUCCESS,
    };
}
