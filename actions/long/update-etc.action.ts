import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Response } from '@models/response';

export const UPDATE_ETC_KEY = 'UPDATE_ETC';

export const UpdateEtcActionTypes = {
    UPDATE: `${UPDATE_ETC_KEY}_UPDATE`,
} as const;

export interface UpdateEtcRequestPayload extends CorePayload {
    field: string;
    content: string;
}

export interface UpdateEtcRequestAction extends Action<string> {
    payload: UpdateEtcRequestPayload;
}

export function updateEtcRequest(
    payload: UpdateEtcRequestPayload,
): UpdateEtcRequestAction {
    return {
        type: UpdateEtcActionTypes.UPDATE,
        payload,
    };
}
