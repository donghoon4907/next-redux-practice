import type { ButtonHTMLAttributes, FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export const MyButton: FC<Props> = ({ children, className, ...rest }) => {
    return (
        <button className={`btn ${className}`} {...rest}>
            {children}
        </button>
    );
};
