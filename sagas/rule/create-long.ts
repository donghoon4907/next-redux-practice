import type { CreateLongRuleRequestAction } from '@actions/rule/long/create.action';
import { call, put, takeEvery } from 'redux-saga/effects';
import rulesService from '@services/rulesService';
import { commonMiddleware } from '@utils/generators/common';
import {
    CreateLongRuleActionTypes,
    createLongRuleSuccess,
} from '@actions/rule/long/create.action';

function* createLongRuleSaga({ payload }: CreateLongRuleRequestAction) {
    const { callback, ...rest } = payload;

    const { data } = yield call(rulesService.beforeCreateLongRule, rest);

    const { Message } = data;

    if (!data.data) {
        alert(Message);
    }

    yield put(createLongRuleSuccess());

    return data;
}

export function* watchCreateLongRule() {
    yield takeEvery(
        CreateLongRuleActionTypes.REQUEST,
        commonMiddleware(createLongRuleSaga),
    );
}
