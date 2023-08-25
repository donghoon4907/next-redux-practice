import type { Reducer } from 'redux';
import type { Pay } from '@models/pay';
import type { InsuredPerson } from '@models/insured-person';
import type { GetLongsSuccessPayload } from '@actions/long/get-longs.action';
import produce from 'immer';
import { PayActionTypes } from '@actions/long/set-pay.action';

export interface GeneralState {
    /**
     * 일반계약 목록
     */
    generals: GetLongsSuccessPayload;
    /**
     * 일반계약 상세
     */
    general: any;
    /**
     * 납입실적 목록
     */
    pays: Pay[];
    /**
     * 삭제한 납입실적 목록
     */
    removedPays: Pay[];
    /**
     * 피보험자 목록
     */
    insuredPeople: InsuredPerson[];
    /**
     * 삭제한 피보험자 목록
     */
    removedInsuredPeople: InsuredPerson[];
}

const initialState: GeneralState = {
    generals: {
        fields: [],
        rows: [],
        total: null,
        ptitles: [],
        lastPayload: null,
    },
    general: null,
    pays: [],
    removedPays: [],
    insuredPeople: [],
    removedInsuredPeople: [],
};

export const generalReducer: Reducer<GeneralState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case PayActionTypes.CREATE: {
                draft.pays = draft.pays.concat(action.payload);
                break;
            }
            case PayActionTypes.UPDATE: {
                const { index, ...rest } = action.payload;

                for (let i = 0; i < draft.pays.length; i++) {
                    if (draft.pays[i].index === index) {
                        draft.pays[i] = {
                            ...draft.pays[i],
                            ...rest,
                        };

                        break;
                    }
                }

                break;
            }
            case PayActionTypes.DELETE: {
                const findIndex = draft.pays.findIndex(
                    (v) => v.index === action.payload.index,
                );

                if (findIndex !== -1) {
                    const [deleted] = draft.pays.splice(findIndex, 1);

                    if (deleted.idx) {
                        draft.removedPays = draft.removedPays.concat(deleted);
                    }
                }

                break;
            }
            default:
                return state;
        }
    });
