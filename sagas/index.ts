import { all, call } from 'redux-saga/effects';

import { longSaga } from './long';
import { boardSaga } from './board';
import { uploadSaga } from './upload';
import { hrSaga } from './hr';
import { customerSaga } from './customer';
import { generalSaga } from './general';

export function* rootSaga() {
    yield all([
        call(longSaga),
        call(generalSaga),
        call(boardSaga),
        call(uploadSaga),
        call(hrSaga),
        call(customerSaga),
    ]);
}
