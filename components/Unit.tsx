import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';
import { HTMLAttributes } from 'react';

interface Props extends CoreProps, HTMLAttributes<HTMLDivElement> {
    placement: 'first' | 'middle' | 'last' | 'checkbox' | 'picker' | 'button';
}

export const MyUnit: FC<Props> = ({ children, placement, ...rest }) => {
    const displayName = 'wr-detail-input';

    return (
        <div
            className={`${displayName}__unit ${displayName}__unit--${placement}`}
            {...rest}
        >
            {children}
        </div>
    );
};
