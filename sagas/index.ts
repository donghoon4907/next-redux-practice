import { all, call } from 'redux-saga/effects';

import { demoSaga } from './demo';
import { longSaga } from './long';
import { boardSaga } from './board';
import { uploadSaga } from './upload';
import { hrSaga } from './hr';

export function* rootSaga() {
    yield all([
        call(demoSaga),
        call(longSaga),
        call(boardSaga),
        call(uploadSaga),
        call(hrSaga),
    ]);
}
