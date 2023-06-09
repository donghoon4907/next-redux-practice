import type { FC, LabelHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps, LabelHTMLAttributes<HTMLLabelElement> {}
/**
 * 기본 레이블 컴포넌트
 *
 */
export const Label: FC<Props> = ({ children, ...props }) => {
    return (
        <label className="form-label" {...props}>
            {children}
        </label>
    );
};
