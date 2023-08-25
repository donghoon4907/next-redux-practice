import type { AnyAction } from 'redux';
import type { Saga } from 'redux-saga';
import axios, { AxiosError } from 'axios';
import { call, put } from 'redux-saga/effects';
import { DayJSModule } from '@utils/dayjs';
import { sagaError } from '@actions/error/error.action';

export function searchMiddleware(saga: any): Saga {
    return function* (action: AnyAction) {
        try {
            const { payload } = action;

            const { successAction, ...rest } = payload;

            const { data }: any = yield call(saga, action);

            const successPayload: any = {
                rows: [],
                fields: [],
                total: {
                    pay: 0,
                    count: 0,
                    tp: 0,
                },
                lastPayload: rest,
            };

            if (data) {
                const { rows, fields, total, search } = data;

                successPayload.fields = fields;

                successPayload.total = total;

                if (rows) {
                    // 날짜 변환
                    const dayJS = new DayJSModule();

                    successPayload.rows = rows.map((v: any) => {
                        const output = { ...v };

                        for (const key of Object.keys(output)) {
                            const value = output[key] as any;

                            dayJS.initialize(value);

                            if (dayJS.isDate()) {
                                let date;
                                switch (key) {
                                    // case 'bdatefrom': {
                                    //     date = dayJS.getDateFormat(
                                    //         'YYYY MM-DD HH:mm:ss',
                                    //     );
                                    //     break;
                                    // }
                                    // case 'bdateto': {
                                    //     date = dayJS.getDateFormat(
                                    //         'YYYY MM-DD HH:mm:ss',
                                    //     );
                                    //     break;
                                    // }
                                    default: {
                                        date = dayJS.getDefaultDateFormat();
                                        break;
                                    }
                                }
                                output[key] = date;
                            }
                        }

                        return output;
                    });
                }

                if (search) {
                    // 상품명 변환
                    const pTitleIndex = search.findIndex(
                        (v: any) => v.title === '상품명',
                    );
                    if (pTitleIndex !== -1) {
                        successPayload['ptitles'] = search[pTitleIndex].row.map(
                            (v: any) => ({ label: v.title, value: v.p_code }),
                        );
                    }
                }
            }

            if (successAction) {
                yield put(payload.successAction(successPayload));
            }

            payload.callback?.(data);
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const axiosError = err as AxiosError;

                const { message } = axiosError;

                const statusCode = axiosError.response?.status || -1;

                yield put(sagaError({ message, statusCode }));
            }
        }
    };
}
