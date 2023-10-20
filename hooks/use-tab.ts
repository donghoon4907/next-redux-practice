import type { CoreTabOption } from '@interfaces/core';
import { useState } from 'react';

interface UseTabFunction {
    (defaultValue: CoreTabOption): [
        CoreTabOption,
        (value: CoreTabOption) => void,
    ];
}

export const useTab: UseTabFunction = (defaultValue) => {
    const [tab, setTab] = useState<CoreTabOption>(defaultValue);

    const onClick = (tab: CoreTabOption) => {
        setTab(tab);
    };

    return [tab, onClick];
};
