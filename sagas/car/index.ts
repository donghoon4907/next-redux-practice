import { all, fork } from 'redux-saga/effects';

import { watchCreateCar } from './create-car';
import { watchGetCar } from './get-car';
import { watchUpdateCar } from './update-car';
import { watchCalculateCar } from './calculate-car';
import { watchGetCarcode } from './get-carcode';
import { watchGetCars } from './get-cars';

export function* carSaga() {
    yield all([
        fork(watchGetCars),
        fork(watchGetCar),
        fork(watchCreateCar),
        fork(watchUpdateCar),
        fork(watchCalculateCar),
        fork(watchGetCarcode),
    ]);
}
