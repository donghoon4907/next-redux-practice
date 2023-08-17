import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';

export const LONG_ETC_KEY = 'WR-LONG_ETC';

export const LongEtcUpdateActionTypes = {
    UPDATE: `UPDATE_${LONG_ETC_KEY}`,
} as const;

export interface LongEtcUpdateRequestPayload extends CorePayload {
    field: string;
    content: string;
}

export interface LongEtcUpdateRequestAction extends Action<string> {
    payload: LongEtcUpdateRequestPayload;
}

export function updateLongEtcRequest(
    payload: LongEtcUpdateRequestPayload,
): LongEtcUpdateRequestAction {
    return {
        type: LongEtcUpdateActionTypes.UPDATE,
        payload,
    };
}
