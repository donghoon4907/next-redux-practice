import { all, fork } from 'redux-saga/effects';

import { watchCreateCar } from './create-car';
import { watchGetCar } from './get-car';
import { watchUpdateCar } from './update-car';

export function* carSaga() {
    yield all([fork(watchCreateCar), fork(watchGetCar), fork(watchUpdateCar)]);
}
