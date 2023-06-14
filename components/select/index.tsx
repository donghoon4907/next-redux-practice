import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import { useState, useEffect } from 'react';
import Select from 'react-select';

interface Props {
    options: readonly CoreSelectOption[];
    onChange: (selectedOption: CoreSelectOption | null) => void;
    placeholder: string;
    width: number;
}
/**
 * 기본 셀렉트 컴포넌트
 *
 */
export const MySelect: FC<Props> = ({
    options,
    onChange,
    placeholder,
    width,
}) => {
    const [selectedOption, setSelectedOption] =
        useState<CoreSelectOption | null>(null);

    const handleChange = (option: CoreSelectOption | null) => {
        setSelectedOption(option);
    };

    useEffect(() => {
        onChange(selectedOption);
    }, [selectedOption, onChange]);

    return (
        <Select
            options={options}
            value={selectedOption}
            onChange={handleChange}
            placeholder={placeholder}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    width,
                }),
            }}
        />
    );
};
