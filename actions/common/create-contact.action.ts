import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Spe } from '@models/spe';

export const CREATE_CONTACT_KEY = 'CREATE_CONTACT';

export const CreateContactActionTypes = {
    REQUEST: `${CREATE_CONTACT_KEY}_REQUEST`,
    SUCCESS: `${CREATE_CONTACT_KEY}_SUCCESS`,
    FAILURE: `${CREATE_CONTACT_KEY}_FAILURE`,
} as const;

export interface CreateContactRequestPayload extends CorePayload {
    // 고객 idx
    m_idx: number;
    // 계약 idx
    spe_idx: number;
    // 계약구분
    spe: Spe;
    // 계약번호
    cnum: string;
    // 상담구분
    kind?: string;
    // 채널
    channel?: string;
    // 사유발생일
    issuedate?: string;
    // 응대예정일
    replydatetime?: string;
    // 진행상태
    status?: string;
    // 내용
    comment?: string;
    // 작성자
    insert_userid?: string;
}

export interface CreateContactRequestAction extends Action<string> {
    payload: CreateContactRequestPayload;
}

export interface CreateContactSuccessAction extends Action<string> {}

export function createContactRequest(
    payload: CreateContactRequestPayload,
): CreateContactRequestAction {
    return {
        type: CreateContactActionTypes.REQUEST,
        payload,
    };
}

export function createContactSuccess(): CreateContactSuccessAction {
    return {
        type: CreateContactActionTypes.SUCCESS,
    };
}
