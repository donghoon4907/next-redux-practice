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
    width?: number;
    /**
     * 셀렉트 높이
     *
     */
    height?: number;
    /**
     * Placeholder 폰트 크기
     *
     */
    placeHolderFontSize?: number;
}

export const MySelect: FC<Props> = ({
    options,
    value,
    onChange,
    placeholder,
    width = 150,
    height = 30,
    placeHolderFontSize = 14,
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
            menuPlacement="auto"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: `${width}px`,
                    minHeight: `${height}px`,
                    height: `${height}px`,
                    borderColor: '#dee2e6',
                    borderRadius: 0,
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: `${height}px`,
                    padding: '0 6px',
                }),
                placeholder: (defaultStyles) => {
                    return {
                        ...defaultStyles,
                        fontSize: `${placeHolderFontSize}px`,
                        color: 'black',
                    };
                },
                input: (provided, state) => ({
                    ...provided,
                    margin: '0px',
                }),
                indicatorSeparator: (state) => ({
                    display: 'none',
                }),
                indicatorsContainer: (provided, state) => ({
                    ...provided,
                    height: `${height}px`,
                }),
            }}
        />
    );
};
