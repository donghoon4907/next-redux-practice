import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';

interface UseDatepickerOption {
    /**
     * callback
     */
    callbackOnChange?: (nextOption: Date | null) => void;
}
export interface UseDatepickerOutput {
    value: Date | null;
    onChange: (value: Date | null) => void;
    onClean: () => void;
}
interface UseDatepickerFunction {
    (defaultValue: Date | null, where?: UseDatepickerOption): [
        UseDatepickerOutput,
        CoreSetState<Date | null>,
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

export const useDateRangepicker = (defaultValue: [Date, Date] | null) => {
    const [value, setValue] = useState<[Date, Date] | null>(defaultValue);

    const onChange = (value: [Date, Date] | null) => {
        setValue(value);
    };

    const onClean = () => {
        setValue(null);
    };

    return { value, onChange, onClean };
};
