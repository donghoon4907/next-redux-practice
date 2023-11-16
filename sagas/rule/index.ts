import { all, fork } from 'redux-saga/effects';

import { watchGetMakeableRates } from './get-makeable-rules';
import { watchGetSudists } from './get-sudists';
import { watchGetCalspecs } from './get-calspecs';
import { watchGetRuleOrgas } from './get-orgas';
import { watchGetGrades } from './get-grades';
import { watchGetHwans } from './get-hwans';

export function* ruleSaga() {
    yield all([
        fork(watchGetMakeableRates),
        fork(watchGetSudists),
        fork(watchGetCalspecs),
        fork(watchGetRuleOrgas),
        fork(watchGetGrades),
        fork(watchGetHwans),
    ]);
}
