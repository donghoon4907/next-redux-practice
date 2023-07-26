import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';

export interface UseDatepickerOutput {
    value: Date | null;
    onChange: (value: Date | null) => void;
    onClean: () => void;
}
interface UseDatepickerFunction {
    (defaultValue: Date | null): [
        UseDatepickerOutput,
        CoreSetState<Date | null>,
    ];
}

export const useDatepicker: UseDatepickerFunction = (defaultValue) => {
    const [value, setValue] = useState<Date | null>(defaultValue);

    const onChange = (value: Date | null) => {
        setValue(value);
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
