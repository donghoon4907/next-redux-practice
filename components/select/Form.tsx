import type { FC } from 'react';
import type { UseSelectOption } from '@hooks/use-select';
import type { CoreSelectOption } from '@interfaces/core';
import type { MySelectProps } from '.';
import { useSelect } from '@hooks/use-select';
import { MySelect } from '.';

interface Props extends MySelectProps {
    defaultValue?: CoreSelectOption | null;
    where?: UseSelectOption;
}

export const FormSelect: FC<Props> = ({
    where,
    defaultValue = null,
    ...props
}) => {
    const [select] = useSelect(
        props.options ? props.options : [],
        defaultValue,
        where,
    );

    return <MySelect {...props} {...select} />;
};
