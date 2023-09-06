import type { FC } from 'react';
import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import type { MySelectProps } from '@components/select';
import { MySelect } from '@components/select';

interface Props extends Omit<MySelectProps, 'value' | 'onChange'> {
    index: number;
    values: CoreSelectOption[];
    setValues: CoreSetState<CoreSelectOption[]>;
}

export const UploadSelect: FC<Props> = ({
    index,
    values,
    setValues,
    ...rest
}) => {
    const handleChange = (option: CoreSelectOption | null) => {
        if (option) {
            const findIndex = values.findIndex(
                (v) => v !== null && v.value === option.value,
            );

            if (findIndex === -1) {
                const newValues = [...values];

                newValues[index] = option;

                setValues(newValues);
            } else {
                alert('이미 선택되어 있습니다.');
            }
        }
    };

    return (
        <MySelect
            value={values[index]}
            onChange={handleChange}
            options={values}
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
