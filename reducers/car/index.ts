import type { Reducer } from 'redux';
import type { Bupum } from '@models/bupum';
import produce from 'immer';
import { BupumActionTypes } from '@actions/contract/car/set-bupum.action';
import { GetCarActionTypes } from '@actions/contract/car/get-car.action';
import { GetCarCompaniesActionTypes } from '@actions/contract/car/get-car-companies.action';

export interface CarState {
    /**
     * 자동차계약 목록
     */
    // cars: GetCarsSuccessPayload;
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
    carCompanies: any[];
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
}

const initialState: CarState = {
    // cars: {
    //     fields: [],
    //     rows: [],
    //     total: null,
    //     ptitles: [],
    //     lastPayload: null,
    // },
    car: null,
    // etcs: [],
    bupums: [],
    removedBupums: [],
    carCompanies: [],
    companyCars: [],
    carYears: [],
    carSeries: [],
    carOptions: [],
};

export const carReducer: Reducer<CarState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
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
            case GetCarCompaniesActionTypes.SUCCESS: {
                const { type, data } = action.payload;

                if (type === 'companies') {
                    draft.carCompanies = data;
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
            case GetCarCompaniesActionTypes.CLEAR: {
                const { type } = action.payload;

                if (type === 'companies') {
                    draft.carCompanies = [];
                } else if (type === 'company-cars') {
                    draft.companyCars = [];
                } else if (type === 'car-years') {
                    draft.carYears = [];
                } else if (type === 'car-series') {
                    draft.carSeries = [];
                } else if (type === 'car-options') {
                    draft.carOptions = [];
                }

                break;
            }
            default:
                return state;
        }
    });
