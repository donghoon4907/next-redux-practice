import type { FC, InputHTMLAttributes } from 'react';
import type { UseInputOption } from '@hooks/use-input';
import { useInput, useResidentNumberInput } from '@hooks/use-input';
import { MyInput } from '.';

interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    where?: UseInputOption;
}

export const FormInput: FC<Props> = ({ where, ...props }) => {
    const [input] = useInput('', where);

    return <MyInput {...props} {...input} />;
};

export const FormResidentNumberInput: FC<Props> = ({ where, ...props }) => {
    const [input] = useResidentNumberInput('', where);

    return <MyInput {...props} {...input} />;
};
