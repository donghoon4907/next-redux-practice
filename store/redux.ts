import { applyMiddleware, createStore, Middleware, Store } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga';
import { createWrapper, Context } from 'next-redux-wrapper';

import { rootReducer } from '../reducers';
import { rootSaga } from '../sagas';

const bindMiddleware = (middleware: Middleware<any>[]) => {
    // if (process.env.NODE_ENV !== 'production') {
    //     const { composeWithDevTools } = require('redux-devtools-extension');

    //     return composeWithDevTools(applyMiddleware(...middleware));
    // }

    const { composeWithDevTools } = require('redux-devtools-extension');

    return composeWithDevTools(applyMiddleware(...middleware));
};

export interface SagaStore extends Store {
    sagaTask?: Task;
}

export const makeStore = (context: Context) => {
    const sagaMiddleware = createSagaMiddleware({
        onError: (err) => {
            console.log('in store');
            // 에러 로그 로직 추가 예정...
            console.error(err);
        },
    });

    const store = createStore(
        rootReducer,
        bindMiddleware([sagaMiddleware]),
    ) as SagaStore;

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
};

export const wrapper = createWrapper<SagaStore>(makeStore, {
    debug: false,
});
