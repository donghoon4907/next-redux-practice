import type { CoreProps } from '@interfaces/core';
import type { ButtonHTMLAttributes, FC } from 'react';

interface Props extends CoreProps, ButtonHTMLAttributes<HTMLButtonElement> {}

export const IconWrapper: FC<Props> = ({ children, ...another }) => {
    return (
        <button type="button" className="wr-btn" {...another}>
            {children}
        </button>
    );
};
