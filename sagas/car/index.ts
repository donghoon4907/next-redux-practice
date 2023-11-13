import { all, fork } from 'redux-saga/effects';

import { watchCreateCar } from './create-car';
import { watchGetCar } from './get-car';
import { watchUpdateCar } from './update-car';
import { watchCalculateCar } from './calculate-car';
import { watchGetCarcode } from './get-carcode';
import { watchGetCars } from './get-cars';
import { watchGetEstimates } from './get-estimates';
import { watchGetLazyEstimate } from './get-lazy-estimate';
import { watchGetEstimate } from './get-estimate';

export function* carSaga() {
    yield all([
        fork(watchGetCars),
        fork(watchGetCar),
        fork(watchCreateCar),
        fork(watchUpdateCar),
        fork(watchCalculateCar),
        fork(watchGetCarcode),
        fork(watchGetEstimates),
        fork(watchGetEstimate),
        fork(watchGetLazyEstimate),
    ]);
}
