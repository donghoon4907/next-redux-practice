import type { CoreSelectOption } from '@interfaces/core';
import { useState } from 'react';

export type UseSelectOutput = {
    value: string;
    onChange: (value: CoreSelectOption | null) => void;
};

export const useDatepicker = (defaultValue: Date | null) => {
    const [value, setValue] = useState<Date | null>(defaultValue);

    const onChange = (value: Date | null) => {
        setValue(value);
    };

    const onClean = () => {
        setValue(null);
    };

    return { value, onChange, onClean };
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
