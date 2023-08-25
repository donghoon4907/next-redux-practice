import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';

interface UseDatepickerOption {
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

    return [{ value, onChange, onClean }, setValue];
};
