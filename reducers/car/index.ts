import type { Reducer } from 'redux';
import type { Bupum } from '@models/bupum';
import type { GetCarsSuccessPayload } from '@actions/contract/car/get-cars.action';
import {
    GetEstimatesActionTypes,
    type GetEstimatesSuccessPayload,
} from '@actions/contract/car/get-estimates.action';
import produce from 'immer';
import { BupumActionTypes } from '@actions/contract/car/set-bupum.action';
import { GetCarActionTypes } from '@actions/contract/car/get-car.action';
import { GetCarcodeActionTypes } from '@actions/contract/car/get-carcode.action';
import { GetCarsActionTypes } from '@actions/contract/car/get-cars.action';
import { GetLazyEstimateActionTypes } from '@actions/contract/car/get-lazy-estimate.action';

export interface CarState {
    /**
     * 자동차보유계약 목록
     */
    cars: GetCarsSuccessPayload;
    /**
     * 자동차계약 상세
     */
    car: any;
    /**
     * 추가부속 목록
     */
    bupums: Bupum[];
    /**
     * 삭제한 추가부속 목록
     */
    removedBupums: Bupum[];
    /**
     * 제조사 목록
     */
    carCompanies: {
        idate: string;
        data: any[];
    };
    /**
     * 제조사의 제품 목록
     */
    companyCars: any[];
    /**
     * 제품의 등록년도 목록
     */
    carYears: any[];
    /**
     * 제품의 시리즈 목록
     */
    carSeries: any[];
    /**
     * 제품의 세부항목 목록
     */
    carOptions: any[];
    /**
     * 비교견적 목록
     */
    estimates: GetEstimatesSuccessPayload;
    /**
     * 비교견적 상세
     */
    estimate: any;
}

const initialState: CarState = {
    cars: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    car: null,
    // etcs: [],
    bupums: [],
    removedBupums: [],
    carCompanies: {
        idate: '',
        data: [],
    },
    companyCars: [],
    carYears: [],
    carSeries: [],
    carOptions: [],
    estimates: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    estimate: null,
};

export const carReducer: Reducer<CarState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetCarsActionTypes.SUCCESS: {
                draft.cars = action.payload;

                break;
            }
            case GetCarActionTypes.SUCCESS: {
                draft.car = action.payload;

                break;
            }
            case BupumActionTypes.CREATE: {
                draft.bupums = draft.bupums.concat(action.payload);
                break;
            }
            case BupumActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.bupums.length; i++) {
                    if (draft.bupums[i].index === index) {
                        draft.bupums[i] = {
                            ...draft.bupums[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case BupumActionTypes.DELETE: {
                const findIndex = draft.bupums.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.bupums.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedBupums =
                            draft.removedBupums.concat(deleted);
                    }
                }

                break;
            }
            case GetCarcodeActionTypes.SUCCESS: {
                const { type, idate, data } = action.payload;

                if (type === 'companies') {
                    draft.carCompanies.data = data;
                    draft.carCompanies.idate = idate;
                } else if (type === 'company-cars') {
                    draft.companyCars = data;
                } else if (type === 'car-years') {
                    draft.carYears = data;
                } else if (type === 'car-series') {
                    draft.carSeries = data;
                } else if (type === 'car-options') {
                    draft.carOptions = data;
                }

                break;
            }
            case GetCarcodeActionTypes.CLEAR: {
                const { type } = action.payload;

                if (type === 'companies') {
                    draft.companyCars = [];
                    draft.carYears = [];
                    draft.carSeries = [];
                    draft.carOptions = [];
                } else if (type === 'company-cars') {
                    draft.carYears = [];
                    draft.carSeries = [];
                    draft.carOptions = [];
                } else if (type === 'car-years') {
                    draft.carSeries = [];
                    draft.carOptions = [];
                } else if (type === 'car-series') {
                    draft.carOptions = [];
                }

                break;
            }
            case GetEstimatesActionTypes.SUCCESS: {
                draft.estimates = action.payload;

                break;
            }
            case GetLazyEstimateActionTypes.SUCCESS: {
                draft.estimate = action.payload;

                break;
            }
            default:
                return state;
        }
    });
