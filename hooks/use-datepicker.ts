import type { CoreSetState } from '@interfaces/core';
import {
    addMonths,
    compareAsc,
    isSameMonth,
    lastDayOfMonth,
    setDate,
} from 'date-fns';
import { useState } from 'react';

export interface UseDatepickerOption {
    /**
     * callback
     */
    callbackOnChange?: (nextOption: Date | null) => void;
}

interface UseDateRangepickerOption {
    /**
     * callback
     */
    callbackOnChange?: (nextOption: [Date, Date] | null) => void;
}
export interface UseDatepickerOutput {
    value: Date | null;
    onChange: (value: Date | null) => void;
    onClean: () => void;
}

export interface UseDateRangepickerOutput {
    value: [Date, Date] | null;
    onChange: (value: [Date, Date] | null) => void;
    onClean: () => void;
}

export interface UseDateRangepickerHelper {
    onPrevMonth: () => void;
    onNextMonth: () => void;
}
interface UseDatepickerFunction {
    (defaultValue: Date | null, where?: UseDatepickerOption): [
        UseDatepickerOutput,
        CoreSetState<Date | null>,
    ];
}

interface useDateRangepickerFunction {
    (defaultValue: [Date, Date] | null, where?: UseDateRangepickerOption): [
        UseDateRangepickerOutput,
        CoreSetState<[Date, Date] | null>,
        UseDateRangepickerHelper,
    ];
}

export const useDatepicker: UseDatepickerFunction = (
    defaultValue,
    where = {},
) => {
    const [value, setValue] = useState<Date | null>(defaultValue);

    const onChange = (value: Date | null) => {
        setValue(value);

        where.callbackOnChange?.(value);
    };

    const onClean = () => {
        setValue(null);
    };

    return [{ value, onChange, onClean }, setValue];
};

export const useDateRangepicker: useDateRangepickerFunction = (
    defaultValue,
    where = {},
) => {
    const [value, setValue] = useState<[Date, Date] | null>(defaultValue);

    const onChange = (value: [Date, Date] | null) => {
        setValue(value);

        where.callbackOnChange?.(value);
    };

    const onClean = () => {
        setValue(null);
    };

    const onPrevMonth = () => {
        if (value) {
            const startDate = setDate(addMonths(value[0], -1), 1);

            let lastDate = lastDayOfMonth(startDate);
            if (isSameMonth(new Date(), startDate)) {
                lastDate = new Date();
            }

            setValue([startDate, lastDate]);
        } else {
            alert('먼저 날짜를 설정하세요.');
        }
    };

    const onNextMonth = () => {
        if (value) {
            const today = new Date();

            const startDate = setDate(addMonths(value[0], 1), 1);
            if (compareAsc(today, startDate) === -1) {
                return alert('오늘 이후의 날짜로 설정할 수 없습니다.');
            }

            let lastDate = lastDayOfMonth(startDate);
            if (isSameMonth(today, startDate)) {
                lastDate = today;
            }

            setValue([startDate, lastDate]);
        } else {
            alert('먼저 날짜를 설정하세요.');
        }
    };

    return [
        { value, onChange, onClean },
        setValue,
        { onPrevMonth, onNextMonth },
    ];
};
