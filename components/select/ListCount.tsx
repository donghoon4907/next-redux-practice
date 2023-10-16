import type { FC } from 'react';
import type { CoreSelectOption } from '@interfaces/core';
import Select from 'react-select';
import variables from '@styles/_variables.module.scss';

import { MySelectProps } from '.';

export const ListCountSelect: FC<MySelectProps> = ({
    options,
    value,
    onChange,
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        onChange?.(option);
    };

    return (
        <Select
            className="select"
            inputId="nums"
            options={options}
            value={value}
            onChange={handleChange}
            placeholder="선택"
            menuPlacement="auto"
            styles={{
                control: (baseStyles, state) => ({
                    ...baseStyles,
                    // width: `${width}px`,
                    minHeight: 30,
                    height: 30,
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: variables.blue3,
                    boxShadow: 'none',
                    // borderLeftWidth: placement === 'right' ? '0' : '1px',
                    // borderRightWidth: placement === 'left' ? '0' : '1px',
                    '&:hover': {
                        borderColor: variables.inputBorderColor,
                    },
                }),
                valueContainer: (provided, state) => ({
                    ...provided,
                    height: 30,
                    padding: '0 6px',
                    textAlign: 'left',
                    border: `1px solid #BCBCBC`,
                    fontWeight: '500',
                    color: variables.inputBorderColor,
                    borderRightWidth: 0,
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px',
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    color: variables.secondaryColor,
                    fontSize: '14px',
                }),
                placeholder: (defaultStyles) => {
                    return {
                        ...defaultStyles,
                        fontSize: '14px',
                        fontWeight: '500',
                        color: '#BCBCBC',
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
                    width: 30,
                    height: 30,
                    border: `1px solid ${variables.blue1}`,
                    backgroundColor: variables.blue2,
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px',
                }),
                dropdownIndicator: (provided) => ({
                    ...provided,
                    color: variables.blue1,
                    padding: 0,
                    paddingLeft: 4,
                }),
                menu: (provided, state) => {
                    return {
                        ...provided,
                        borderRadius: variables.filterBorderRadius,
                        margin: 0,
                        border: `1px solid #BCBCBC`,
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
                    fontSize: '14px',
                    textAlign: 'left',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
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
            }}
        />
    );
};
