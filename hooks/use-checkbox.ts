import type { ChangeEvent } from 'react';
import type { CoreSetState } from '@interfaces/core';
import { useState } from 'react';

export interface UseCheckboxOutput {
    checked: boolean;
    onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
}

interface UseCheckboxFunction {
    (defaultValue: boolean): [UseCheckboxOutput, CoreSetState<boolean>];
}

export const useCheckbox: UseCheckboxFunction = (defaultValue = false) => {
    const [checked, setChecked] = useState(defaultValue);

    const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setChecked(evt.target.checked);
    };

    return [{ checked, onChange }, setChecked];
};
