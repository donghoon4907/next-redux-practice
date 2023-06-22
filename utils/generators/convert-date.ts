import { AnyAction } from 'redux';
import { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { DayJSModule } from '@utils/dayjs';

export function convertDateMiddleware(saga: any): Saga {
    return function* (action: AnyAction) {
        try {
            const { payload } = action;

            const { data, fields, total }: any = yield call(saga, action);

            const dayJS = new DayJSModule();

            const convertedData = data.map((v: any) => {
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

            if (payload.successAction) {
                yield put(
                    payload.successAction({
                        data: convertedData,
                        fields,
                        total,
                    }),
                );
            }

            payload.callback?.(data);
        } catch (err) {
            // 에러 데이터 구조 확인 후 error action creator 추가
            console.log(err);
        }
    };
}
