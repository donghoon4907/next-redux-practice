import { all, fork } from 'redux-saga/effects';

import { watchCreateCar } from './create-car';
import { watchGetCar } from './get-car';

export function* carSaga() {
    yield all([fork(watchCreateCar), fork(watchGetCar)]);
}
