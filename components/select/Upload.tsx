import type { FC } from 'react';
import type { CoreSelectOption, CoreSetState } from '@interfaces/core';
import type { MySelectProps } from '@components/select';
import { MySelect } from '@components/select';

interface Props extends Omit<MySelectProps, 'value' | 'onChange'> {
    index: number;
    values: Array<CoreSelectOption | null>;
    setValues: CoreSetState<Array<CoreSelectOption | null>>;
}

export const UploadSelect: FC<Props> = ({
    index,
    values,
    setValues,
    options,
    ...rest
}) => {
    let sortedOptions = [...options!];
    if (values[index]) {
        sortedOptions = sortedOptions.sort((v) => {
            if (v.value === values[index]!.value) {
                return -1;
            } else {
                return 1;
            }
        });
    }
    sortedOptions.unshift({ label: '선택', value: '' });

    const handleChange = (option: CoreSelectOption | null) => {
        if (option) {
            const findIndex = values.findIndex(
                (v) => v !== null && v.value === option.value,
            );

            if (findIndex === -1) {
                const newValues = [...values];

                if (option.value) {
                    newValues[index] = option;
                } else {
                    newValues[index] = null;
                }

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
            options={sortedOptions}
            {...rest}
            styles={{
                option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? 'white' : 'black',
                }),
            }}
        />
    );
};
