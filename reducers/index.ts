import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import { errorReducer } from '@reducers/common/error';
import { loadingReducer } from '@reducers/common/loading';
import { demoReducer } from '@reducers/demo';
import { tabReducer } from '@reducers/tab';
import { drawerReducer } from '@reducers/drawer';
import { longReducer } from '@reducers/long';
import { boardReducer } from '@reducers/board';
import { uploadReducer } from '@reducers/upload';

const combinedReducer = combineReducers({
    demo: demoReducer,
    tab: tabReducer,
    drawer: drawerReducer,
    long: longReducer,
    board: boardReducer,
    error: errorReducer,
    loading: loadingReducer,
    upload: uploadReducer,
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
