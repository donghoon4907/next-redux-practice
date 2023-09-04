import type { Reducer } from 'redux';
import type { Bupum } from '@models/bupum';
import produce from 'immer';
import { BupumActionTypes } from '@actions/contract/car/set-bupum.action';

export interface CarState {
    /**
     * 자동차계약 목록
     */
    // cars: GetCarsSuccessPayload;
    /**
     * 자동차계약 상세
     */
    // car: any;
    /**
     * 추가부속 목록
     */
    bupums: Bupum[];
    /**
     * 삭제한 추가부속 목록
     */
    removedBupums: Bupum[];
}

const initialState: CarState = {
    // cars: {
    //     fields: [],
    //     rows: [],
    //     total: null,
    //     ptitles: [],
    //     lastPayload: null,
    // },
    // long: null,
    // etcs: [],
    bupums: [],
    removedBupums: [],
};

export const carReducer: Reducer<CarState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
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

            default:
                return state;
        }
    });
