import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import { useState } from 'react';

interface UseSelectOption {
    /**
     * callback
     */
    callbackOnChange?: (nextOption: CoreSelectOption | null) => void;
}

export type UseSelectOutput = {
    value: CoreSelectOption | null;
    onChange: (value: CoreSelectOption | null) => void;
    options: CoreSelectOption[];
};

interface UseSelectFunction {
    (
        options: CoreSelectOption[],
        defaultValue?: CoreSelectOption | null,
        where?: UseSelectOption,
    ): [UseSelectOutput, CoreSetState<CoreSelectOption | null>];
}

export const useSelect: UseSelectFunction = (
    options,
    defaultValue = options[0],
    where = {},
) => {
    const [value, setValue] = useState<CoreSelectOption | null>(defaultValue);

    const onChange = (v: CoreSelectOption | null) => {
        setValue(v);

        where.callbackOnChange?.(v);
    };

    return [{ value, onChange, options }, setValue];
};
