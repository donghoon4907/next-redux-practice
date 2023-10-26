import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Code } from '@models/code';

export const CODE_KEY = 'WR-CODE';

export const CodeActionTypes = {
    CREATE: `CREATE_${CODE_KEY}`,
    UPDATE: `UPDATE_${CODE_KEY}`,
    DELETE: `DELETE_${CODE_KEY}`,
} as const;

export interface CreateCodePayload extends Code {}

export interface UpdateCodePayload extends Partial<CreateCodePayload> {}

export interface DeleteCodePayload extends CorePayload {
    index: number;
}

export interface CreateCodeAction extends Action<string> {
    payload: CreateCodePayload;
}

export interface UpdateCodeAction extends Action<string> {
    payload: UpdateCodePayload;
}

export interface DeleteCodeAction extends Action<string> {
    payload: DeleteCodePayload;
}

export function createCode(payload: CreateCodePayload): CreateCodeAction {
    return {
        type: CodeActionTypes.CREATE,
        payload,
    };
}

export function updateCode(payload: UpdateCodePayload): UpdateCodeAction {
    return {
        type: CodeActionTypes.UPDATE,
        payload,
    };
}

export function deleteCode(payload: DeleteCodePayload): DeleteCodeAction {
    return {
        type: CodeActionTypes.DELETE,
        payload,
    };
}
