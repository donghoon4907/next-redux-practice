import type { FC, InputHTMLAttributes } from 'react';
import { useInput } from '@hooks/use-input';

interface Props
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {}

export const InternalInput: FC<Props> = ({ className = '', ...another }) => {
    const [value] = useInput('');

    return (
        <input
            className={`form-control ${className}`}
            {...another}
            {...value}
        />
    );
};
