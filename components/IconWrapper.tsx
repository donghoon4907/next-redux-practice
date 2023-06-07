import type { CoreProps } from '@interfaces/core';
import type { ButtonHTMLAttributes, FC } from 'react';

interface Props extends CoreProps, ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string;
}

export const IconWrapper: FC<Props> = ({
    children,
    type = 'button',
    label,
    ...another
}) => {
    return (
        <div className="btn-wrap">
            <button type={type} {...another}>
                {children}
            </button>
            {label && <span>{label}</span>}
        </div>
    );
};
