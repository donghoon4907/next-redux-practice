import type { Action } from 'redux';
import type { Baeseo } from '@models/baeseo';

export const BAESEO_KEY = 'WR-BAESEO';

export const BaeseoActionTypes = {
    CREATE: `CREATE_${BAESEO_KEY}`,
    UPDATE: `UPDATE_${BAESEO_KEY}`,
    DELETE: `DELETE_${BAESEO_KEY}`,
} as const;

export interface CreateBaeseoBaeseoload extends Baeseo {}

export interface UpdateBaeseoBaeseoload
    extends Partial<CreateBaeseoBaeseoload> {}

export interface DeleteBaeseoBaeseoload {
    index: number;
}

export interface CreateBaeseoAction extends Action<string> {
    payload: CreateBaeseoBaeseoload;
}

export interface UpdateBaeseoAction extends Action<string> {
    payload: UpdateBaeseoBaeseoload;
}

export interface DeleteBaeseoAction extends Action<string> {
    payload: DeleteBaeseoBaeseoload;
}

export function createBaeseo(
    payload: CreateBaeseoBaeseoload,
): CreateBaeseoAction {
    return {
        type: BaeseoActionTypes.CREATE,
        payload,
    };
}

export function updateBaeseo(
    payload: UpdateBaeseoBaeseoload,
): UpdateBaeseoAction {
    return {
        type: BaeseoActionTypes.UPDATE,
        payload,
    };
}

export function deleteBaeseo(
    payload: DeleteBaeseoBaeseoload,
): DeleteBaeseoAction {
    return {
        type: BaeseoActionTypes.DELETE,
        payload,
    };
}
