import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import { useState } from 'react';

type UseSelectOutput = {
    value: CoreSelectOption | null;
    onChange: (value: CoreSelectOption | null) => void;
};

interface UseSelectFunction {
    (defaultValue: CoreSelectOption | null): [
        UseSelectOutput,
        CoreSetState<CoreSelectOption | null>,
    ];
}

export const useSelect: UseSelectFunction = (
    defaultValue: CoreSelectOption | null,
) => {
    const [value, setValue] = useState<CoreSelectOption | null>(defaultValue);

    const onChange = (v: CoreSelectOption | null) => {
        setValue(v);
    };

    return [{ value, onChange }, setValue];
};
