import type { CoreSelectOption } from '@interfaces/core';
import { useState } from 'react';

export type UseSelectOutput = {
    value: string;
    onChange: (value: CoreSelectOption | null) => void;
};

export const useSelect = (defaultValue: CoreSelectOption) => {
    const [value, setValue] = useState<CoreSelectOption | null>(defaultValue);

    const onChange = (v: CoreSelectOption | null) => {
        setValue(v);
    };

    return { value, onChange };
};
