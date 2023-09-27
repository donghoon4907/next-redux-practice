import type { FC, TextareaHTMLAttributes } from 'react';
import type { UseInputOption } from '@hooks/use-input';
import { useInput } from '@hooks/use-input';
import { MyTextarea } from '.';

interface Props
    extends Omit<
        TextareaHTMLAttributes<HTMLTextAreaElement>,
        'value' | 'onChange'
    > {
    where?: UseInputOption;
}

export const FormTextarea: FC<Props> = ({ where, ...props }) => {
    const [input] = useInput('', where);

    return <MyTextarea {...props} {...input} />;
};
