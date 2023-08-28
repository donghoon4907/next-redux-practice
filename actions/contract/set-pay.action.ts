import type { Action } from 'redux';
import type { Pay } from '@models/pay';

export const PAY_KEY = 'WR-PAY';

export const PayActionTypes = {
    CREATE: `CREATE_${PAY_KEY}`,
    UPDATE: `UPDATE_${PAY_KEY}`,
    DELETE: `DELETE_${PAY_KEY}`,
} as const;

export interface CreatePayPayload extends Pay {}

export interface UpdatePayPayload extends Partial<CreatePayPayload> {}

export interface DeletePayPayload {
    index: number;
}

export interface CreatePayAction extends Action<string> {
    payload: CreatePayPayload;
}

export interface UpdatePayAction extends Action<string> {
    payload: UpdatePayPayload;
}

export interface DeletePayAction extends Action<string> {
    payload: DeletePayPayload;
}

export function createPay(payload: CreatePayPayload): CreatePayAction {
    return {
        type: PayActionTypes.CREATE,
        payload,
    };
}

export function updatePay(payload: UpdatePayPayload): UpdatePayAction {
    return {
        type: PayActionTypes.UPDATE,
        payload,
    };
}

export function deletePay(payload: DeletePayPayload): DeletePayAction {
    return {
        type: PayActionTypes.DELETE,
        payload,
    };
}
