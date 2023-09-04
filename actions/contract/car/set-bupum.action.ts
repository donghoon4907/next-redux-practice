import type { Action } from 'redux';
import type { Bupum } from '@models/bupum';

export const BUPUM_KEY = 'WR-BUPUM';

export const BupumActionTypes = {
    CREATE: `CREATE_${BUPUM_KEY}`,
    UPDATE: `UPDATE_${BUPUM_KEY}`,
    DELETE: `DELETE_${BUPUM_KEY}`,
} as const;

export interface CreateBupumBupumload extends Bupum {}

export interface UpdateBupumBupumload extends Partial<CreateBupumBupumload> {}

export interface DeleteBupumBupumload {
    index: number;
}

export interface CreateBupumAction extends Action<string> {
    payload: CreateBupumBupumload;
}

export interface UpdateBupumAction extends Action<string> {
    payload: UpdateBupumBupumload;
}

export interface DeleteBupumAction extends Action<string> {
    payload: DeleteBupumBupumload;
}

export function createBupum(payload: CreateBupumBupumload): CreateBupumAction {
    return {
        type: BupumActionTypes.CREATE,
        payload,
    };
}

export function updateBupum(payload: UpdateBupumBupumload): UpdateBupumAction {
    return {
        type: BupumActionTypes.UPDATE,
        payload,
    };
}

export function deleteBupum(payload: DeleteBupumBupumload): DeleteBupumAction {
    return {
        type: BupumActionTypes.DELETE,
        payload,
    };
}
