import { all, call } from 'redux-saga/effects';

import { longSaga } from './long';
import { boardSaga } from './board';
import { uploadSaga } from './upload';
import { hrSaga } from './hr';

export function* rootSaga() {
    yield all([
        call(longSaga),
        call(boardSaga),
        call(uploadSaga),
        call(hrSaga),
    ]);
}
