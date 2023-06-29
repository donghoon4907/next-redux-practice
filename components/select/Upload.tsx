import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import type { MySelectProps } from '@components/select';
import { useState } from 'react';
import { MySelect } from '@components/select';

interface Props extends Omit<MySelectProps, 'value' | 'onChange'> {
    /**
     * default option
     *
     */
    defaultValue?: CoreSelectOption | null;
}

export const UploadSelect: FC<Props> = ({ defaultValue, ...rest }) => {
    const [value, setValue] = useState<CoreSelectOption | null>(
        defaultValue || null,
    );

    const handleChange = (option: CoreSelectOption | null) => {
        setValue(option);
    };

    return (
        <MySelect
            value={value}
            onChange={handleChange}
            {...rest}
            styles={{
                option: (provided, state) => ({
                    ...provided,
                    backgroundColor: state.isSelected ? 'red' : 'white',
                }),
            }}
        />
    );
};
