import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {
    placement: 'middle' | 'last';
}

export const MyUnit: FC<Props> = ({ children, placement }) => {
    const displayName = 'wr-detail-input';

    return (
        <div
            className={`${displayName}__unit ${displayName}__unit--${placement}`}
        >
            {children}
        </div>
    );
};
