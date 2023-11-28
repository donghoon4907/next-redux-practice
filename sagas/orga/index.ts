import { all, fork } from 'redux-saga/effects';

import { watchGetOrgas } from './get-orgas';
import { watchSearchOrgas } from './search-orgas';
import { watchCreateOrga } from './create-orga';
import { watchGetOrga } from './get-orga';
import { watchUpdateOrga } from './update-orga';

export function* orgaSaga() {
    yield all([
        fork(watchCreateOrga),
        fork(watchUpdateOrga),
        fork(watchGetOrgas),
        fork(watchGetOrga),
        fork(watchSearchOrgas),
    ]);
}
