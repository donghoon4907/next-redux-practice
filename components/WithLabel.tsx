import type { FC } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps {
    /**
     * label connect id
     *
     */
    id?: string;
    /**
     * 셀렉트 너비
     *
     */
    label: string;
    /**
     * label type
     *
     */
    type?: 'active' | 'disable';
}

export const WithLabel: FC<Props> = ({
    children,
    id,
    label,
    type = 'active',
}) => {
    const displayName = 'wr-with';

    return (
        <div className={`${displayName}__wrap`}>
            <label
                className={`${displayName}__label ${displayName}__label--${type}`}
                htmlFor={id}
            >
                {label}
            </label>

            {children}
        </div>
    );
};
