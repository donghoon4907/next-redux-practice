import type { FC, InputHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps, InputHTMLAttributes<HTMLInputElement> {
    /**
     * label type
     *
     */
    type?: 'active' | 'disable';
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
}

export const WithInput: FC<Props> = ({
    children,
    type = 'active',
    ...rest
}) => {
    const displayName = 'wr-with';

    return (
        <div className={`${displayName}__wrap`}>
            <input
                type="text"
                className={`form-control ${displayName}__label ${displayName}__label--${type}`}
                {...rest}
            />

            {children}
        </div>
    );
};
