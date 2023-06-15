import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import Select from 'react-select';

interface Props {
    /**
     * 옵션 목록
     *
     */
    options: readonly CoreSelectOption[];
    /**
     * 외부 상태값
     *
     */
    value: CoreSelectOption | null;
    /**
     * 외부 상태를 변경하는 핸들러
     *
     */
    onChange: (selectedOption: CoreSelectOption | null) => void;
    /**
     * 가이드 코멘트
     *
     */
    placeholder: string;
    /**
     * 셀렉트 너비
     *
     */
    width: number;
}

export const MySelect: FC<Props> = ({
    options,
    value,
    onChange,
    placeholder,
    width,
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        onChange(option);
    };

    return (
        <Select
            options={options}
            value={value}
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
