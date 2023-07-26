import type { Action } from 'redux';
import type { User } from '@models/user';

export const VIEWER_KEY = 'WR-VIEWER';

export const ViewerActionTypes = {
    UPDATE: `UPDATE${VIEWER_KEY}`,
} as const;

export type ViewerUpdatePayload = User[];

export interface ViewerUpdateAction extends Action<string> {
    payload: ViewerUpdatePayload;
}

export function updateViewer(payload: ViewerUpdatePayload): ViewerUpdateAction {
    return {
        type: ViewerActionTypes.UPDATE,
        payload,
    };
}
