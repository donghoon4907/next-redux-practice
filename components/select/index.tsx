import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import Select, { GroupBase, StylesConfig } from 'react-select';
import variables from '@styles/_variables.module.scss';

export interface MySelectProps {
    inputId?: string;
    /**
     * 옵션 목록
     *
     */
    options?: readonly CoreSelectOption[];
    /**
     * 외부 상태값
     *
     */
    value?: CoreSelectOption | null;
    /**
     * 외부 상태를 변경하는 핸들러
     *
     */
    onChange?: (selectedOption: CoreSelectOption | null) => void;
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
    /**
     * select height
     *
     */
    height?: string;
    /**
     * select styles
     *
     */
    styles?: StylesConfig<CoreSelectOption, false, GroupBase<CoreSelectOption>>;

    /**
     * read only
     *
     */
    isDisabled?: boolean;
}

export const MySelect: FC<MySelectProps> = ({
    inputId,
    options = [],
    value = null,
    onChange,
    placeholder,
    width,
    height = variables.filterHeight,
    placeHolderFontSize = variables.filterFontSize,
    styles,
    isDisabled = false,
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        onChange?.(option);
    };

    return (
        <Select
            className="select"
            inputId={inputId}
            options={options}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            menuPlacement="auto"
            isDisabled={isDisabled}
            noOptionsMessage={() => '데이터가 없습니다.'}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    // width: `${width}px`,
                    minHeight: height,
                    height,
                    borderColor: variables.dividerColor,
                    borderRadius: variables.filterBorderRadius,
                    backgroundColor: isDisabled
                        ? variables.disabledInputColor
                        : 'white',
                    boxShadow: 'none',
                    '&:hover': {
                        borderColor: variables.dividerColor,
                    },
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height,
                    padding: '0 6px',
                }),
                placeholder: (defaultStyles) => {
                    return {
                        ...defaultStyles,
                        fontSize: `${placeHolderFontSize}px`,
                        color: 'black',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
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
                    height,
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
                    borderTopWidth: 0,
                    boxShadow: 'none',
                    zIndex: variables.selectZindex,
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
                noOptionsMessage: (provided, state) => ({
                    ...provided,
                    zIndex: 100000,
                }),
                ...styles,
            }}
        />
    );
};
