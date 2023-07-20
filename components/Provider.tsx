import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import { CustomProvider } from 'rsuite';
import koKR from 'rsuite/locales/ko_KR';

interface Props extends CoreProps {}

export const MyProvider: FC<Props> = ({ children }) => {
    return (
        <CustomProvider
            locale={{
                ...koKR,
                DateRangePicker: { ...koKR.DateRangePicker, ok: '반영' },
            }}
        >
            {children}
        </CustomProvider>
    );
};
