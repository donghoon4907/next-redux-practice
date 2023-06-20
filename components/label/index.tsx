import type { FC, LabelHTMLAttributes } from 'react';
import type { CoreProps } from '@interfaces/core';

interface Props extends CoreProps, LabelHTMLAttributes<HTMLLabelElement> {}

export const MyLabel: FC<Props> = ({ children, ...props }) => {
    return (
        <label className="form-label wr-label" {...props}>
            {children}
        </label>
    );
};
