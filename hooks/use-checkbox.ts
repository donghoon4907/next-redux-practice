import type { ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';

interface UseCheckoutOption {
    callbackOnChange?: (nextVal: boolean) => void;
}

export interface UseCheckboxOutput {
    checked: boolean;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

interface UseCheckboxFunction {
    (defaultValue: boolean, where?: UseCheckoutOption): [
        UseCheckboxOutput,
        CoreSetState<boolean>,
    ];
}

export const useCheckbox: UseCheckboxFunction = (
    defaultValue = false,
    where = {},
) => {
    const [checked, setChecked] = useState(defaultValue);

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        const nextVal = evt.target.checked;

        setChecked(nextVal);

        where.callbackOnChange?.(nextVal);
    };

    return [{ checked, onChange }, setChecked];
};
