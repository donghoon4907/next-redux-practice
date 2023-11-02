import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import { useState } from 'react';

export interface UseSelectOption {
    /**
     * callback
     */
    callbackOnChange?: (nextOption: CoreSelectOption | null) => void;
    /**
     * before condition
     */
    beforeOnChangeCondition?: (nextOption: CoreSelectOption | null) => boolean;
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
        if (where.hasOwnProperty('beforeOnChangeCondition')) {
            if (where.beforeOnChangeCondition!(v)) {
                setValue(v);
            } else {
                return;
            }
        } else {
            setValue(v);
        }

        where.callbackOnChange?.(v);
    };

    return [{ value, onChange, options }, setValue];
};
