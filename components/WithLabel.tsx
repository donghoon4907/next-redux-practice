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
    /**
     * 필수 여부
     *
     */
    isRequired?: boolean;
    /**
     * 확장 여부
     *
     */
    isExpand?: boolean;
}

export const WithLabel: FC<Props> = ({
    children,
    id,
    label,
    type = 'active',
    isRequired = false,
    isExpand = false,
}) => {
    const displayName = 'wr-with';

    return (
        <div className={`${displayName}__wrap`}>
            <label
                className={`${displayName}__label ${displayName}__label--${type} ${
                    isExpand ? `${displayName}__label--nowrap` : ''
                }`}
                htmlFor={id}
            >
                <span className={isRequired ? `wr-label--required` : ''}>
                    {label}
                </span>
            </label>

            {children}
        </div>
    );
};
