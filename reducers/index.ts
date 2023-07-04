import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';

import { errorReducer } from './common/error';
import { loadingReducer } from './common/loading';
import { demoReducer } from './demo';
import { tabReducer } from './tab';
import { drawerReducer } from './drawer';
import { longReducer } from './long';
import { boardReducer } from './board';
import { uploadReducer } from './upload';
import { gnbReducer } from './gnb';
import { modalReducer } from './modal';
import { userReducer } from './user';

const combinedReducer = combineReducers({
    demo: demoReducer,
    tab: tabReducer,
    drawer: drawerReducer,
    long: longReducer,
    board: boardReducer,
    error: errorReducer,
    loading: loadingReducer,
    upload: uploadReducer,
    gnb: gnbReducer,
    modal: modalReducer,
    user: userReducer,
});

export const rootReducer = (state: any, action: AnyAction) => {
    let nextState;
    if (action.type === HYDRATE) {
        nextState = {
            ...state,
            ...action.payload,
        };
    } else {
        nextState = combinedReducer(state, action);
    }

    return nextState;
};

export type AppState = ReturnType<typeof rootReducer>;
