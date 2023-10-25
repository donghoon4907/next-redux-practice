import type { FC } from 'react';
import type { MySelectProps } from '.';
import { useState } from 'react';
import Select from 'react-select';
import variables from '@styles/_variables.module.scss';
import { isEmpty } from '@utils/validator/common';

interface Props extends MySelectProps {
    label: string;
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
}

export const FloatSelect: FC<Props> = ({
    id,
    label,
    value,
    isRequired,
    ...rest
}) => {
    const displayName = 'wr-detail-input';

    const [focus, setFocus] = useState(false);

    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const isFloat = focus || !isEmpty(value);

    return (
        <div
            className={`${displayName}__wrap ${
                isFloat ? `${displayName}--active` : ''
            }`}
        >
            <div
                className={`${displayName}__float ${
                    isFloat ? `${displayName}__float--active` : ''
                }`}
            >
                <div
                    className={`${displayName}__label ${
                        isRequired && isFloat ? 'wr-label--required' : ''
                    }`}
                >
                    {label}
                </div>
            </div>
            {isRequired && !isFloat && (
                <div className={`${displayName}__required`}></div>
            )}
            <Select
                className="select"
                inputId={id}
                placeholder={label}
                menuPlacement="bottom"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={value}
                styles={{
                    container: () => ({
                        width: '100%',
                        height: 26,
                        overflow: 'hidden',
                    }),

                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        border: 'none',
                        backgroundColor: focus ? 'white' : 'inherit',
                        boxShadow: 'none',
                        minHeight: `26px !important`,
                    }),
                    valueContainer: (provided, state) => ({
                        ...provided,
                        textAlign: 'left',
                        fontWeight: '500',
                        color: variables.inputBorderColor,
                        fontSize: 16,
                        height: 26,
                        padding: 0,
                    }),
                    singleValue: (provided, state) => ({
                        ...provided,
                        color: variables.secondaryColor,
                        fontSize: '16px',
                    }),
                    placeholder: (defaultStyles) => {
                        return {
                            ...defaultStyles,
                            fontSize: '16px',
                            fontWeight: '400',
                            color: variables.detailPlaceholderColor,
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
                        width: 26,
                        height: 26,
                        border: 'none',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
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
                            border: `1px solid ${variables.detailInputBorderColor}`,
                            borderTopWidth: state.placement === 'top' ? 1 : 0,
                            borderBottomWidth:
                                state.placement === 'top' ? 0 : 1,
                            boxShadow: 'none',
                            zIndex: variables.selectZindex,
                            top: state.placement === 'top' ? 0 : 40,
                            left: 0,
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
                {...rest}
            />
        </div>
    );
};
