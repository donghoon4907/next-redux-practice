import type { Reducer } from 'redux';
import type { CoreSelectOption } from '@interfaces/core';
import type { SearchUsersSuccessPayload } from '@actions/user/search-users.action';
import produce from 'immer';
import { GetUsersActionTypes } from '@actions/user/get-users.action';
import { PermissionActionTypes } from '@actions/user/set-permission.action';
import { GetUserActionTypes } from '@actions/user/get-user.action';
import { SearchUsersActionTypes } from '@actions/user/search-users.action';
import { GetLazyUsersActionTypes } from '@actions/user/get-lazy-users.action';

export interface UserState {
    /**
     * 영업가족 목록 - 간소화
     */
    users: CoreSelectOption[];
    /**
     * 영업가족 목록 - 검색
     */
    searchUsers: SearchUsersSuccessPayload;
    /**
     * 영업가족 상세
     */
    user: any;
    /**
     * 로그인한 사용자 정보
     */
    loggedInUser: any;
}

const initialState: UserState = {
    users: [],
    searchUsers: {
        fields: [],
        rows: [],
        total: null,
        lastPayload: null,
    },
    user: null,
    loggedInUser: null,
};

export const userReducer: Reducer<UserState, any> = (
    state = initialState,
    action,
) =>
    produce(state, (draft) => {
        switch (action.type) {
            case GetLazyUsersActionTypes.SUCCESS:
            case GetUsersActionTypes.SUCCESS: {
                draft.users = action.payload;
                break;
            }
            case SearchUsersActionTypes.SUCCESS: {
                draft.searchUsers = action.payload;
                break;
            }
            case GetUserActionTypes.SUCCESS: {
                draft.user = action.payload;
                break;
            }
            case PermissionActionTypes.UPDATE: {
                draft.loggedInUser = action.payload;
                break;
            }
            default:
                return state;
        }
    });
