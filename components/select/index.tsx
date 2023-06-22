import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import Select from 'react-select';
import variables from '@styles/_variables.module.scss';

export interface MySelectProps {
    id?: string;
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
     * Placeholder 폰트 크기
     *
     */
    placeHolderFontSize?: number;
}

export const MySelect: FC<MySelectProps> = ({
    id,
    options,
    value,
    onChange,
    placeholder,
    width = 150,
    placeHolderFontSize = variables.filterFontSize,
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        onChange(option);
    };

    return (
        <Select
            id={id}
            options={options}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            menuPlacement="auto"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: `${width}px`,
                    minHeight: variables.filterHeight,
                    height: variables.filterHeight,
                    borderColor: variables.dividerColor,
                    borderRadius: variables.filterBorderRadius,
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: variables.dividerColor,
                    },
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: variables.filterHeight,
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
                    height: variables.filterHeight,
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    color: variables.dividerColor,
                }),
                menu: (provided, state) => ({
                    ...provided,
                    borderRadius: variables.filterBorderRadius,
                    margin: 0,
                    border: `1px solid ${variables.dividerColor}`,
                    borderTop: 'none',
                    boxShadow: 'none',
                }),
                menuList: (provided, state) => ({
                    ...provided,
                    padding: 0,
                }),
                option: (provided, state) => ({
                    ...provided,
                    // backgroundColor: state.isFocused ? 'blue' : 'white', // 포커스 상태에 따른 배경색 변경
                    // color: state.isFocused ? 'white' : 'black', // 포커스 상태에 따른 글자색 변경
                    // '&:hover': {
                    //   backgroundColor: 'lightblue', // 마우스 오버 시 배경색 변경
                    // },
                }),
            }}
        />
    );
};
