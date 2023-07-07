import type { CorePayload, CoreSelectOption } from '@interfaces/core';
import type { Action } from 'redux';

export const DEPART_KEY = 'WR-DEPART';

export const DepartActionTypes = {
    UPDATE: `UPDATE_${DEPART_KEY}`,
} as const;

export interface DepartUpdatePayload extends CorePayload, CoreSelectOption {}

export interface DepartUpdateAction extends Action<string> {
    payload: DepartUpdatePayload;
}

export function updateDepart(payload: DepartUpdatePayload): DepartUpdateAction {
    return {
        type: DepartActionTypes.UPDATE,
        payload,
    };
}
