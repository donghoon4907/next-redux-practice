import type { Action } from 'redux';
import type { CorePayload } from '@interfaces/core';
import type { Guarantee } from '@models/guarantee';
import type { Code } from '@models/code';

export const CREATE_USER_KEY = 'CREATE_USER';

export const CreateUserActionTypes = {
    REQUEST: `${CREATE_USER_KEY}_REQUEST`,
    SUCCESS: `${CREATE_USER_KEY}_SUCCESS`,
    FAILURE: `${CREATE_USER_KEY}_FAILURE`,
} as const;

export interface CreateUserRequestPayload extends CorePayload {
    name: string;
    mobile: string;
    orga_idx: number;
    nickname?: string;
    idnum1: string;
    title?: string;
    birthday?: string;
    birth_type?: boolean;
    mobile_com: string;
    telephone?: string;
    tel_direct?: string;
    email?: string;
    postcode?: string;
    address1?: string;
    address2?: string;
    address3?: string;
    indate?: string;
    outdate?: string;
    status?: string;
    user_type?: string;
    est_val: {
        comNm?: {
            kind: string;
            val: string;
        };
        salesNm?: {
            kind: string;
            val: string;
        };
        phone?: {
            kind: string;
            val: string;
        };
        fax?: {
            kind: string;
            val: string;
        };
        direct?: {
            kind: string;
            val: string;
        };
        address?: {
            kind: string;
            val: string;
        };
    };
    income_bank?: string;
    income_account?: string;
    income_name?: string;
    cal: {
        car_cal_type?: string;
        car_cal_idx?: number;
        gen_cal_type?: string;
        gen_cal_base?: number;
        gen_cal_ratio?: number;
        gen_cal_idx?: number;
        long_grade: boolean;
    };
    guarantee: Guarantee[];
    fccode: Code[];
    permission: {
        permission: {
            use_web: boolean;
            use_mobile: boolean;
        };
    };
    associate: {
        type: string;
        no: string;
        wcode: number | null;
        indate: string;
        outdate: string;
        qulification: string;
    }[];
}

export interface CreateUserRequestAction extends Action<string> {
    payload: CreateUserRequestPayload;
}

export interface CreateUserSuccessAction extends Action<string> {}

export function createUserRequest(
    payload: CreateUserRequestPayload,
): CreateUserRequestAction {
    return {
        type: CreateUserActionTypes.REQUEST,
        payload,
    };
}

export function createUserSuccess(): CreateUserSuccessAction {
    return {
        type: CreateUserActionTypes.SUCCESS,
    };
}
