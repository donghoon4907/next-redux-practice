import { all, fork } from 'redux-saga/effects';

import { watchCreateCar } from './create-car';

export function* carSaga() {
    yield all([fork(watchCreateCar)]);
}
