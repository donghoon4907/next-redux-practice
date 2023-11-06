import type { CreateContactRequestPayload } from '@actions/common/create-contact.action';
import type { GetContactsRequestPayload } from '@actions/common/get-contacts.action';
import { getBackendAxios } from '@utils/axios/backend';
import { getInternalAxios } from '@utils/axios/internal';

export function beforeGetContacts(payload: GetContactsRequestPayload) {
    return getInternalAxios().get('/api/get-contacts', {
        params: payload,
    });
}

export function getContacts({
    cust_idx,
    spe,
    cnum,
}: GetContactsRequestPayload) {
    return getBackendAxios().get(`/commonapi/contact/listindet/${cust_idx}`, {
        params: {
            spe,
            cnum,
        },
    });
}

export function beforeCreateContact(payload: CreateContactRequestPayload) {
    return getInternalAxios().post('/api/create-contact', payload);
}

export function createContact(payload: CreateContactRequestPayload) {
    return getBackendAxios().post('/commonapi/contact/new', payload);
}

const rootServices = {
    beforeGetContacts,
    getContacts,
    beforeCreateContact,
    createContact,
};

export default rootServices;
