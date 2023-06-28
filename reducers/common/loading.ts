import { Action } from 'redux';

export interface LoadingState {
    [key: string]: boolean;
}

export const loadingReducer = (state: LoadingState = {}, action: Action) => {
    const matches = /(.*)_(REQUEST|SUCCESS|ERROR|)/.exec(action.type);

    if (!matches) {
        return state;
    }

    const [, requestName, requestStatus] = matches;

    if (requestStatus === '') {
        return state;
    }

    return {
        ...state,
        loading: requestStatus === 'REQUEST',
        lastRequestName: requestName,
    };
};
