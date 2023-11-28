import type { CreateContactRequestPayload } from '@actions/common/create-contact.action';
import type { GetContactsRequestPayload } from '@actions/common/get-contacts.action';
import { getBackendAxios } from '@utils/axios/backend';

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

export function createContact(payload: CreateContactRequestPayload) {
    return getBackendAxios().post('/commonapi/contact/new', payload);
}

const rootServices = {
    getContacts,
    createContact,
};

export default rootServices;
