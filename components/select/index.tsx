import type { FC } from 'react';
import type { GroupBase, MenuPlacement, StylesConfig } from 'react-select';
import type { CoreSelectOption } from '@interfaces/core';
import Select from 'react-select';
import variables from '@styles/_variables.module.scss';

export interface MySelectProps {
    id?: string;
    /**
     * 옵션 목록
     *
     */
    options?: CoreSelectOption[];
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
    placeholder?: string;
    /**
     * 셀렉트 너비
     *
     */
    // width?: number;
    /**
     * 폰트 크기
     *
     */
    fontSize?: number;
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

    /**
     * with another ui
     */
    placement?: 'right' | 'left' | 'single';
    /**
     * with another ui
     */
    menuPlacement?: MenuPlacement;
    /**
     * 필수 여부
     */
    required?: boolean;
}

export const MySelect: FC<MySelectProps> = ({
    id,
    options = [],
    value = null,
    onChange,
    placeholder = '선택',
    // width,
    height = variables.filterHeight,
    fontSize = 13,
    styles,
    isDisabled = false,
    placement = 'single',
    menuPlacement = 'auto',
    required = false,
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        onChange?.(option);
    };

    return (
        <Select
            className="select"
            inputId={id}
            name={id}
            options={options}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            menuPlacement={menuPlacement}
            isDisabled={isDisabled}
            noOptionsMessage={() => '데이터가 없습니다.'}
            required={required}
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    // width: `${width}px`,
                    minHeight: height,
                    height,
                    borderColor: variables.inputBorderColor,
                    borderRadius: variables.filterBorderRadius,
                    backgroundColor: isDisabled
                        ? variables.disabledInputColor
                        : 'white',
                    boxShadow: 'none',
                    borderLeftWidth: placement === 'right' ? '0' : '1px',
                    borderRightWidth: placement === 'left' ? '0' : '1px',
                    '&:hover': {
                        borderColor: variables.inputBorderColor,
                    },
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height,
                    padding: '0 6px',
                    textAlign: 'left',
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    color: variables.inputFontColor,
                    fontSize: `${fontSize}px`,
                    userSelect: 'none',
                }),
                placeholder: (defaultStyles) => {
                    return {
                        ...defaultStyles,
                        fontSize: `${fontSize}px`,
                        color: variables.inputFontColor,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        userSelect: 'none',
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
                menu: (provided, state) => {
                    return {
                        ...provided,
                        borderRadius: variables.filterBorderRadius,
                        margin: 0,
                        border: `1px solid ${variables.inputBorderColor}`,
                        borderTopWidth: state.placement === 'top' ? 1 : 0,
                        borderBottomWidth: state.placement === 'top' ? 0 : 1,
                        boxShadow: 'none',
                        zIndex: variables.selectZindex,
                    };
                },
                menuList: (provided, state) => ({
                    ...provided,
                    padding: 0,
                }),
                option: (provided, state) => ({
                    ...provided,
                    padding: '6px',
                    fontSize: `${fontSize}px`,
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    color: state.data.color
                        ? state.data.color
                        : state.isSelected
                        ? 'white'
                        : 'black',
                    fontWeight: state.data.fontWeight
                        ? state.data.fontWeight
                        : '400',
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
