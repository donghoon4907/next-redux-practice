import type { CoreMenuOption } from '@interfaces/core';
import { Action } from 'redux';

export const GNB_KEY = 'WR_GNB';

export const GnbActionTypes = {
    UPDATE: `UPDATE_${GNB_KEY}`,
} as const;

export interface GnbUpdateAction extends Action<string> {
    payload: CoreMenuOption[];
}

export function updateGnb(payload: CoreMenuOption[]): GnbUpdateAction {
    return {
        type: GnbActionTypes.UPDATE,
        payload,
    };
}
