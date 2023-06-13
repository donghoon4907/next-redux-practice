import type { Dispatch, FC, SetStateAction } from 'react';
import type { ActionMeta, OnChangeValue, StylesConfig } from 'react-select';
import ExternalSelect from 'react-select';
import type { CoreSelectOption } from '@interfaces/core';

const styles: StylesConfig<CoreSelectOption, true> = {
    multiValue: (base, state) => {
        return state.data.isFixed ? { ...base, backgroundColor: 'gray' } : base;
    },
    multiValueLabel: (base, state) => {
        return state.data.isFixed
            ? { ...base, fontWeight: 'bold', color: 'white', paddingRight: 6 }
            : base;
    },
    multiValueRemove: (base, state) => {
        return state.data.isFixed ? { ...base, display: 'none' } : base;
    },
};

const orderOptions = (values: readonly CoreSelectOption[]) => {
    console.log(values);
    return values
        .filter((v) => v.isFixed)
        .concat(values.filter((v) => !v.isFixed));
};

interface Props {
    value: readonly CoreSelectOption[];
    setValue: Dispatch<SetStateAction<readonly CoreSelectOption[]>>;
    options: readonly CoreSelectOption[];
    placeholder: string;
    isMulti?: boolean;
}
/**
 * 기본 셀렉트 컴포넌트
 *
 */
export const Select: FC<Props> = ({
    value,
    setValue,
    options,
    isMulti = false,
    ...other
}) => {
    const handleChange = (
        newValue: OnChangeValue<CoreSelectOption, true>,
        actionMeta: ActionMeta<CoreSelectOption>,
    ) => {
        switch (actionMeta.action) {
            case 'remove-value':
            case 'pop-value':
                if (actionMeta.removedValue.isFixed) {
                    return;
                }
                break;
            case 'clear':
                newValue = options.filter((v) => v.isFixed);
                break;
        }

        setValue(orderOptions(newValue));
    };

    return (
        <ExternalSelect
            value={value}
            styles={styles}
            isClearable={value.some((v) => !v.isFixed)}
            name="colors"
            options={options}
            onChange={handleChange}
            className="basic-select"
            classNamePrefix="select"
            {...other}
        />
    );
};
