import { all, fork } from 'redux-saga/effects';

import { watchGetContacts } from './get-contacts';
import { watchCreateContact } from './create-contact';

export function* commonSaga() {
    yield all([fork(watchGetContacts), fork(watchCreateContact)]);
}
